########################################################################
# File name: service.py
# This file is part of: aioxmpp
#
# LICENSE
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this program.  If not, see
# <http://www.gnu.org/licenses/>.
#
########################################################################
import asyncio
import functools

from datetime import datetime, timedelta
from enum import Enum

import aioxmpp.callbacks
import aioxmpp.forms
import aioxmpp.service
import aioxmpp.stanza
import aioxmpp.structs
import aioxmpp.tracking

from . import xso as muc_xso


class LeaveMode(Enum):
    """
    The different reasons for a user to leave or be removed from MUC.

    .. attribute:: DISCONNECTED

       The local client disconnected. This only occurs in events referring to
       the local entity.

    .. attribute:: SYSTEM_SHUTDOWN

       The remote server shut down.

    .. attribute:: NORMAL

       The leave was initiated by the occupant themselves and was not a kick or
       ban.

    .. attribute:: KICKED

       The user was kicked from the room.

    .. attribute:: AFFILIATION_CHANGE

       Changes in the affiliation of the user caused them to be removed.

    .. attribute:: MODERATION_CHANGE

       Changes in the moderation settings of the room caused the user to be
       removed.

    .. attribute:: BANNED

       The user was banned from the room.
    """

    DISCONNECTED = -2
    SYSTEM_SHUTDOWN = -1
    NORMAL = 0
    KICKED = 1
    AFFILIATION_CHANGE = 3
    MODERATION_CHANGE = 4
    BANNED = 5


class _OccupantDiffClass(Enum):
    UNIMPORTANT = 0
    NICK_CHANGED = 1
    LEFT = 2


class Occupant:
    """
    A tracking object to track a single occupant in a :class:`Room`.

    .. attribute:: occupantjid

       The occupant JID of the occupant; this is the bare JID of the
       :class:`Room`, with the nick of the occupant as resourcepart.

    .. attribute:: presence_state

       The :class:`~.PresenceState` of the occupant.

    .. attribute:: presence_status

       The :class:`~.LanguageMap` holding the presence status text of the
       occupant.

    .. attribute:: affiliation

       The affiliation of the occupant with the room.

    .. attribute:: role

       The current role of the occupant within the room.

    .. attribute:: jid

       The actual JID of the occupant, if it is known.

    """

    def __init__(self,
                 occupantjid,
                 presence_state=aioxmpp.structs.PresenceState(available=True),
                 presence_status={},
                 affiliation=None,
                 role=None,
                 jid=None):
        super().__init__()
        self.occupantjid = occupantjid
        self.presence_state = presence_state
        self.presence_status = aioxmpp.structs.LanguageMap(presence_status)
        self.affiliation = affiliation
        self.role = role
        self.jid = jid
        self.is_self = False

    @property
    def nick(self):
        return self.occupantjid.resource

    @classmethod
    def from_presence(cls, presence):
        try:
            item = presence.xep0045_muc_user.items[0]
        except (AttributeError, IndexError):
            affiliation = None
            role = None
            jid = None
        else:
            affiliation = item.affiliation
            role = item.role
            jid = item.jid

        return cls(
            occupantjid=presence.from_,
            presence_state=aioxmpp.structs.PresenceState.from_stanza(presence),
            presence_status=aioxmpp.structs.LanguageMap(presence.status),
            affiliation=affiliation,
            role=role,
            jid=jid,
        )

    def update(self, other):
        if self.occupantjid != other.occupantjid:
            raise ValueError("occupant JID mismatch")
        self.presence_state = other.presence_state
        self.presence_status.clear()
        self.presence_status.update(other.presence_status)
        self.affiliation = other.affiliation
        self.role = other.role
        self.jid = other.jid


class Room:
    """
    Interface to a :xep:`0045` multi-user-chat room.

    .. autoattribute:: mucjid

    .. autoattribute:: active

    .. autoattribute:: joined

    .. autoattribute:: this_occupant

    .. autoattribute:: subject

    .. autoattribute:: subject_setter

    .. attribute:: autorejoin

       A boolean flag indicating whether this MUC is supposed to be
       automatically rejoined when the stream it is used gets destroyed and
       re-estabished.

    .. attribute:: password

       The password to use when (re-)joining. If :attr:`autorejoin` is
       :data:`None`, this can be cleared after :meth:`on_enter` has been
       emitted.

    The following methods and properties provide interaction with the MUC
    itself:

    .. autoattribute:: occupants

    .. automethod:: change_nick

    .. automethod:: leave

    .. automethod:: leave_and_wait

    .. automethod:: request_voice

    .. automethod:: send_tracked_message

    .. automethod:: set_role

    .. automethod:: set_affiliation

    .. automethod:: set_subject

    The interface provides signals for most of the rooms events. The following
    keyword arguments are used at several signal handlers (which is also noted
    at their respective documentation):

    `actor` = :data:`None`
       The :class:`UserActor` instance of the corresponding :class:`UserItem`,
       describing which other occupant caused the event.

    `reason` = :data:`None`
       The reason text in the corresponding :class:`UserItem`, which gives more
       information on why an action was triggered.

    `occupant` = :data:`None`
       The :class:`Occupant` object tracking the subject of the operation.

    .. note::

       Signal handlers attached to any of the signals below **must** accept
       arbitrary keyword arguments for forward compatibility. If any of the
       above arguments is listed as positional in the signal signature, it is
       always present and handed as positional argument.

    .. signal:: on_message(message, **kwargs)

       Emits when a group chat :class:`~.Message` `message` is
       received for the room. This is also emitted on messages sent by the
       local user; this allows tracking when a message has been spread to all
       users in the room.

       The signal also emits during history playback from the server.

       The `occupant` argument refers to the sender of the message, if presence
       has been broadcast for the sender. There are two cases where this might
       not be the case:

       1. if the signal emits during history playback, there might be no
          occupant with the given nick anymore.

       2. if the room is configured to not emit presence for occupants in
          certain roles, no :class:`Occupant` instances are created and tracked
          for those occupants

    .. signal:: on_subject_change(message, subject, **kwargs)

       Emits when the subject of the room changes or is transmitted initially.

       `subject` is the new subject, as a :class:`~.structs.LanguageMap`.

       The `occupant` keyword argument refers to the sender of the message, and
       thus the entity who changed the subject. If the message represents the
       current subject of the room on join, the `occupant` may be :data:`None`
       if the entity who has set the subject is not in the room
       currently. Likewise, the `occupant` may indeed refer to an entirely
       different person, as the nick name may have changed owners between the
       setting of the subject and the join to the room.

    .. signal:: on_enter(presence, occupant, **kwargs)

       Emits when the initial room :class:`~.Presence` stanza for the
       local JID is received. This means that the join to the room is complete;
       the message history and subject are not transferred yet though.

       The `occupant` argument refers to the :class:`Occupant` which will be
       used to track the local user.

    .. signal:: on_suspend()

       Emits when the stream used by this MUC gets destroyed (see
       :meth:`~.node.Client.on_stream_destroyed`) and the MUC is configured to
       automatically rejoin the user when the stream is re-established.

    .. signal:: on_resume()

       Emits when the MUC is about to be rejoined on a new stream. This can be
       used by implementations to clear their MUC state, as it is emitted
       *before* any events like presence are emitted.

       The internal state of :class:`Room` is cleared before :meth:`on_resume`
       is emitted, which implies that presence events will be emitted for all
       occupants on re-join, independent on their presence before the
       connection was lost.

       Note that on a rejoin, all presence is re-emitted.

    .. signal:: on_exit(presence, occupant, mode, **kwargs)

       Emits when the unavailable :class:`~.Presence` stanza for the
       local JID is received.

       `mode` indicates how the occupant got removed from the room, see the
       :class:`LeaveMode` enumeration for possible values.

       The `occupant` argument refers to the :class:`Occupant` which
       is used to track the local user. If given in the stanza, the `actor`
       and/or `reason` keyword arguments are provided.

       If :attr:`autorejoin` is false and the stream gets destroyed, or if the
       :class:`.MUCClient` is unloaded from a node, this event emits with
       `presence` set to :data:`None`.

    The following signals inform users about state changes related to **other**
    occupants in the chat room. Note that different events may fire for the
    same presence stanza. A common example is a ban, which triggers
    :meth:`on_affiliation_change` (as the occupants affiliation is set to
    ``"outcast"``) and then :meth:`on_leave` (with :attr:`LeaveMode.BANNED`
    `mode`).

    .. signal:: on_join(presence, occupant, **kwargs)

       Emits when a new occupant enters the room. `occupant` refers to the new
       :class:`Occupant` object which tracks the occupant. The object will be
       indentical for all events related to that occupant, but its contents
       will change accordingly.

       The original :class:`~.Presence` stanza which announced the join
       of the occupant is given as `presence`.

    .. signal:: on_leave(presence, occupant, mode, **kwargs)

       Emits when an occupant leaves the room.

       `occupant` is the :class:`Occupant` instance tracking the occupant which
       just left the room.

       `mode` indicates how the occupant got removed from the room, see the
       :class:`LeaveMode` enumeration for possible values.

       If the `mode` is not :attr:`LeaveMode.NORMAL`, there may be `actor`
       and/or `reason` keyword arguments which provide details on who triggered
       the leave and for what reason.

    .. signal:: on_affiliation_change(presence, occupant, **kwargs)

       Emits when the affiliation of an `occupant` with the room changes.

       `occupant` is the :class:`Occupant` instance tracking the occupant whose
       affiliation changed.

       There may be `actor` and/or `reason` keyword arguments which provide
       details on who triggered the change in affiliation and for what reason.

    .. signal:: on_role_change(presence, occupant, **kwargs)

       Emits when the role of an `occupant` in the room changes.

       `occupant` is the :class:`Occupant` instance tracking the occupant whose
       role changed.

       There may be `actor` and/or `reason` keyword arguments which provide
       details on who triggered the change in role and for what reason.

    .. signal:: on_status_change(presence, occupant, **kwargs)

       Emits when the presence state and/or status of an `occupant` in the room
       changes.

       `occupant` is the :class:`Occupant` instance tracking the occupant whose
       status changed.

    .. signal:: on_nick_change(presence, occupant, **kwargs)

       Emits when the nick name (room name) of an `occupant` changes.

       `occupant` is the :class:`Occupant` instance tracking the occupant whose
       status changed.

    """

    on_message = aioxmpp.callbacks.Signal()

    # this occupant state events
    on_enter = aioxmpp.callbacks.Signal()
    on_suspend = aioxmpp.callbacks.Signal()
    on_resume = aioxmpp.callbacks.Signal()
    on_exit = aioxmpp.callbacks.Signal()

    # other occupant state events
    on_join = aioxmpp.callbacks.Signal()
    on_leave = aioxmpp.callbacks.Signal()
    on_status_change = aioxmpp.callbacks.Signal()
    on_affiliation_change = aioxmpp.callbacks.Signal()
    on_nick_change = aioxmpp.callbacks.Signal()
    on_role_change = aioxmpp.callbacks.Signal()

    # room state events
    on_subject_change = aioxmpp.callbacks.Signal()

    def __init__(self, service, mucjid):
        super().__init__()
        self._service = service
        self._mucjid = mucjid
        self._occupant_info = {}
        self._subject = aioxmpp.structs.LanguageMap()
        self._subject_setter = None
        self._joined = False
        self._active = False
        self._this_occupant = None
        self._tracking = {}
        self.autorejoin = False
        self.password = None

        self.on_exit.connect(self._cleanup_tracking)
        self.on_resume.connect(self._cleanup_tracking)

    def _cleanup_tracking(self, *args, **kwargs):
        for tracker in self._tracking.values():
            tracker.state = aioxmpp.tracking.MessageState.CLOSED
        self._tracking.clear()

    @property
    def service(self):
        return self._service

    @property
    def active(self):
        """
        A boolean attribute indicating whether the connection to the MUC is
        currently live.

        This becomes true when :attr:`joined` first becomes true. It becomes
        false whenever the connection to the MUC is interrupted in a way which
        requires re-joining the MUC (this implies that if stream management is
        being used, active does not become false on temporary connection
        interruptions).
        """
        return self._active

    @property
    def joined(self):
        """
        This attribute becomes true when :meth:`on_enter` is first emitted and
        stays true until :meth:`on_exit` is emitted.

        When it becomes false, the :class:`Room` is removed from the
        bookkeeping of the :class:`.MUCClient` to which it belongs and is thus
        dead.
        """
        return self._joined

    @property
    def subject(self):
        """
        The current subject of the MUC, as :class:`~.structs.LanguageMap`.
        """
        return self._subject

    @property
    def subject_setter(self):
        """
        The nick name of the entity who set the subject.
        """
        return self._subject_setter

    @property
    def this_occupant(self):
        """
        A :class:`Occupant` instance which tracks the local user. This is
        :data:`None` until :meth:`on_enter` is emitted; it is never set to
        :data:`None` again, but the identity of the object changes on each
        :meth:`on_enter`.
        """
        return self._this_occupant

    @property
    def mucjid(self):
        """
        The (bare) :class:`aioxmpp.JID` of the MUC which this :class:`Room`
        tracks.
        """
        return self._mucjid

    @property
    def occupants(self):
        """
        A copy of the list of occupants. The local user is always the first
        item in the list, unless the :meth:`on_enter` has not fired yet.
        """

        if self._this_occupant is not None:
            items = [self._this_occupant]
        else:
            items = []
        items += list(self._occupant_info.values())
        return items

    def _suspend(self):
        self.on_suspend()
        self._active = False

    def _disconnect(self):
        if not self._joined:
            return
        self.on_exit(
            None,
            self.this_occupant,
            LeaveMode.DISCONNECTED
        )
        self._joined = False
        self._active = False

    def _resume(self):
        self._this_occupant = None
        self._occupant_info = {}
        self._active = False
        self.on_resume()

    def _inbound_message(self, stanza):
        self._service.logger.debug("%s: inbound message %r",
                                   self._mucjid,
                                   stanza)

        if not stanza.body and stanza.subject:
            self._subject = aioxmpp.structs.LanguageMap(stanza.subject)
            self._subject_setter = stanza.from_.resource

            self.on_subject_change(
                stanza,
                self._subject,
                occupant=self._occupant_info.get(stanza.from_, None)
            )
        elif stanza.body:
            self.on_message(
                stanza,
                occupant=self._occupant_info.get(stanza.from_, None)
            )

        try:
            tracker = self._tracking.pop(stanza.id_)
        except KeyError:
            pass
        else:
            try:
                tracker.state = \
                    aioxmpp.tracking.MessageState.DELIVERED_TO_RECIPIENT
            except ValueError:
                pass

    def _diff_presence(self, stanza, info, existing):
        if    (not info.presence_state.available and
               303 in stanza.xep0045_muc_user.status_codes):
            return (
                _OccupantDiffClass.NICK_CHANGED,
                (
                    stanza.xep0045_muc_user.items[0].nick,
                )
            )

        result = (_OccupantDiffClass.UNIMPORTANT, None)
        to_emit = []

        if not info.presence_state.available:
            status_codes = stanza.xep0045_muc_user.status_codes
            mode = LeaveMode.NORMAL
            try:
                reason = stanza.xep0045_muc_user.items[0].reason
                actor = stanza.xep0045_muc_user.items[0].actor
            except IndexError:
                reason = None
                actor = None

            if 307 in status_codes:
                mode = LeaveMode.KICKED
            elif 301 in status_codes:
                mode = LeaveMode.BANNED
            elif 321 in status_codes:
                mode = LeaveMode.AFFILIATION_CHANGE
            elif 322 in status_codes:
                mode = LeaveMode.MODERATION_CHANGE
            elif 332 in status_codes:
                mode = LeaveMode.SYSTEM_SHUTDOWN

            result = (
                _OccupantDiffClass.LEFT,
                (
                    mode,
                    actor,
                    reason,
                )
            )
        elif   (existing.presence_state != info.presence_state or
                existing.presence_status != info.presence_status):
            to_emit.append((self.on_status_change, (), {}))

        if existing.role != info.role:
            to_emit.append((
                self.on_role_change,
                (),
                {
                    "actor": stanza.xep0045_muc_user.items[0].actor,
                    "reason": stanza.xep0045_muc_user.items[0].reason,
                },
            ))

        if existing.affiliation != info.affiliation:
            to_emit.append((
                self.on_affiliation_change,
                (),
                {
                    "actor": stanza.xep0045_muc_user.items[0].actor,
                    "reason": stanza.xep0045_muc_user.items[0].reason,
                },
            ))

        if to_emit:
            existing.update(info)
            for signal, args, kwargs in to_emit:
                signal(stanza, existing, *args, **kwargs)

        return result

    def _handle_self_presence(self, stanza):
        info = Occupant.from_presence(stanza)

        if not self._active:
            if stanza.type_ == aioxmpp.structs.PresenceType.UNAVAILABLE:
                self._service.logger.debug(
                    "%s: not active, and received unavailable ... "
                    "is this a reconnect?",
                    self._mucjid,
                )
                return

            self._service.logger.debug("%s: not active, configuring",
                                       self._mucjid)
            self._this_occupant = info
            info.is_self = True
            self._joined = True
            self._active = True
            self.on_enter(stanza, info)
            return

        existing = self._this_occupant
        mode, data = self._diff_presence(stanza, info, existing)
        if mode == _OccupantDiffClass.NICK_CHANGED:
            new_nick, = data
            self._service.logger.debug("%s: nick changed: %r -> %r",
                                       self._mucjid,
                                       existing.occupantjid.resource,
                                       new_nick)
            existing.occupantjid = existing.occupantjid.replace(
                resource=new_nick
            )
            self.on_nick_change(stanza, existing)
        elif mode == _OccupantDiffClass.LEFT:
            mode, actor, reason = data
            self._service.logger.debug("%s: we left the MUC. reason=%r",
                                       self._mucjid,
                                       reason)
            existing.update(info)
            self.on_exit(stanza, existing, mode, actor=actor, reason=reason)
            self._joined = False
            self._active = False

    def _inbound_muc_user_presence(self, stanza):
        self._service.logger.debug("%s: inbound muc user presence %r",
                                   self._mucjid,
                                   stanza)

        if (110 in stanza.xep0045_muc_user.status_codes or
                (self._this_occupant is not None and
                 self._this_occupant.occupantjid == stanza.from_)):
            self._service.logger.debug("%s: is self-presence",
                                       self._mucjid)
            self._handle_self_presence(stanza)
            return

        info = Occupant.from_presence(stanza)
        try:
            existing = self._occupant_info[info.occupantjid]
        except KeyError:
            if stanza.type_ == aioxmpp.structs.PresenceType.UNAVAILABLE:
                self._service.logger.debug(
                    "received unavailable presence from unknown occupant %r."
                    " ignoring.",
                    stanza.from_,
                )
                return
            self._occupant_info[info.occupantjid] = info
            self.on_join(stanza, info)
            return

        mode, data = self._diff_presence(stanza, info, existing)
        if mode == _OccupantDiffClass.NICK_CHANGED:
            new_nick, = data
            del self._occupant_info[existing.occupantjid]
            existing.occupantjid = existing.occupantjid.replace(
                resource=new_nick
            )
            self._occupant_info[existing.occupantjid] = existing
            self.on_nick_change(stanza, existing)
        elif mode == _OccupantDiffClass.LEFT:
            mode, actor, reason = data
            existing.update(info)
            self.on_leave(stanza, existing, mode, actor=actor, reason=reason)
            del self._occupant_info[existing.occupantjid]

    @asyncio.coroutine
    def change_nick(self, new_nick):
        """
        Change the nick name of the occupant.

        :param new_nick: New nickname to use
        :type new_nick: :class:`str`

        This sends the request to change the nickname and waits for the request
        to be sent over the stream.

        The nick change may or may not happen; observe the
        :meth:`on_nick_change` event.
        """

        stanza = aioxmpp.Presence(
            type_=aioxmpp.PresenceType.AVAILABLE,
            to=self._mucjid.replace(resource=new_nick),
        )
        yield from self._service.client.stream.send(
            stanza
        )

    @asyncio.coroutine
    def set_role(self, nick, role, *, reason=None):
        """
        Change the role of an occupant, identified by their `nick`, to the
        given new `role`. Optionally, a `reason` for the role change can be
        provided.

        Setting the different roles require different privilegues of the local
        user. The details can be checked in :xep:`0045` and are enforced solely
        by the server, not local code.

        The coroutine returns when the kick has been acknowledged by the
        server. If the server returns an error, an appropriate
        :class:`aioxmpp.errors.XMPPError` subclass is raised.
        """

        if nick is None:
            raise ValueError("nick must not be None")

        if role is None:
            raise ValueError("role must not be None")

        iq = aioxmpp.stanza.IQ(
            type_=aioxmpp.structs.IQType.SET,
            to=self.mucjid
        )

        iq.payload = muc_xso.AdminQuery(
            items=[
                muc_xso.AdminItem(nick=nick,
                                  reason=reason,
                                  role=role)
            ]
        )

        yield from self.service.client.stream.send(
            iq
        )

    @asyncio.coroutine
    def set_affiliation(self, jid, affiliation, *, reason=None):
        """
        Convenience wrapper around :meth:`.MUCClient.set_affiliation`. See
        there for details, and consider its `mucjid` argument to be set to
        :attr:`mucjid`.
        """
        return (yield from self.service.set_affiliation(
            self.mucjid,
            jid, affiliation,
            reason=reason))

    def set_subject(self, subject):
        """
        Request to set the subject to `subject`. `subject` must be a mapping
        which maps :class:`~.structs.LanguageTag` tags to strings; :data:`None`
        is a valid key.

        Return the :class:`~.stream.StanzaToken` obtained from the stream.
        """

        msg = aioxmpp.stanza.Message(
            type_=aioxmpp.structs.MessageType.GROUPCHAT,
            to=self.mucjid
        )
        msg.subject.update(subject)

        return self.service.client.stream.enqueue(msg)

    def leave(self):
        """
        Request to leave the MUC.

        This sends unavailable presence to the bare :attr:`mucjid`. When the
        leave is completed, :meth:`on_exit` fires.

        .. seealso::

           Method :meth:`leave_and_wait`
             A coroutine which calls :meth:`leave` and returns when
             :meth:`on_exit` is fired.

        """
        presence = aioxmpp.stanza.Presence(
            type_=aioxmpp.structs.PresenceType.UNAVAILABLE,
            to=self._mucjid
        )
        self.service.client.stream.enqueue(presence)

    @asyncio.coroutine
    def leave_and_wait(self):
        """
        Request to leave the MUC and wait for it. This effectively calls
        :meth:`leave` and waits for the next :meth:`on_exit` event.
        """
        fut = asyncio.Future()

        self.leave()

        def on_exit(*args, **kwargs):
            fut.set_result(None)
            return True

        self.on_exit.connect(
            on_exit
        )

        yield from fut

    def _tracking_timeout(self, id_, tracker):
        tracker.state = aioxmpp.tracking.MessageState.TIMED_OUT
        try:
            existing = self._tracking.pop[id_]
        except KeyError:
            pass
        else:
            if existing is tracker:
                del self._tracking[id_]

    def send_tracked_message(self, body_or_stanza, *,
                             timeout=timedelta(seconds=120)):
        """
        Send a tracked message. The first argument can either be a
        :class:`~.Message` or a mapping compatible with
        :attr:`~.Message.body`.

        Return a :class:`~.tracking.MessageTracker` which tracks the
        message. See the documentation of :class:`~.MessageTracker` and
        :class:`~.MessageState` for more details on tracking in general.

        Tracking a MUC groupchat message supports tracking up to the
        :attr:`~.MessageState.DELIVERED_TO_RECIPIENT` state. If a `timeout` is
        given, it must be a :class:`~datetime.timedelta` indicating the time
        span after which the tracking shall time out. `timeout` may be
        :data:`None` to let the tracking never expire.

        .. warning::

           Some MUC implementations rewrite the ``id`` when the message is
           reflected in the MUC. In that case, tracking cannot succeed beyond
           the :attr:`~.MessageState.DELIVERED_TO_SERVER` state, which is
           provided by the basic tracking interface.

           To support these implementations, the `timeout` defaults at 120
           seconds; this avoids that sending a message becomes a memory leak.

        If the chat is exited in the meantime, the messages are set to
        :attr:`~.MessageState.CLOSED` state. This also happens on suspension
        and resumption.
        """
        if isinstance(body_or_stanza, aioxmpp.stanza.Message):
            message = body_or_stanza
            message.type_ = aioxmpp.structs.MessageType.GROUPCHAT
            message.to = self.mucjid
        else:
            message = aioxmpp.stanza.Message(
                type_=aioxmpp.structs.MessageType.GROUPCHAT,
                to=self.mucjid
            )
            message.body.update(body_or_stanza)

        tracker = aioxmpp.tracking.MessageTracker()
        token = self.service.client.stream.enqueue(
            message,
            on_state_change=tracker.on_stanza_state_change
        )
        tracker.token = token

        self._tracking[message.id_] = tracker

        if timeout is not None:
            asyncio.get_event_loop().call_later(
                timeout.total_seconds(),
                self._tracking_timeout,
                message.id_,
                tracker
            )

        return tracker

    @asyncio.coroutine
    def request_voice(self):
        """
        Request voice (participant role) in the room and wait for the request
        to be sent.

        The participant role allows occupants to send messages while the room
        is in moderated mode.

        There is no guarantee that the request will be granted. To detect that
        voice has been granted, observe the :meth:`on_role_change` signal.

        .. versionadded:: 0.8
        """

        msg = aioxmpp.Message(
            to=self.mucjid,
            type_=aioxmpp.MessageType.NORMAL
        )

        data = aioxmpp.forms.Data(
            aioxmpp.forms.DataType.SUBMIT,
        )

        data.fields.append(
            aioxmpp.forms.Field(
                type_=aioxmpp.forms.FieldType.HIDDEN,
                var="FORM_TYPE",
                values=["http://jabber.org/protocol/muc#request"],
            ),
        )
        data.fields.append(
            aioxmpp.forms.Field(
                type_=aioxmpp.forms.FieldType.LIST_SINGLE,
                var="muc#role",
                values=["participant"],
            )
        )

        msg.xep0004_data.append(data)

        yield from self.service.client.stream.send(msg)


def _connect_to_signal(signal, func):
    return signal, signal.connect(func)


class MUCClient(aioxmpp.service.Service):
    """
    Client service implementing the a Multi-User Chat client. By loading it
    into a client, it is possible to join multi-user chats and implement
    interaction with them.

    .. automethod:: join

    Manage rooms:

    .. automethod:: get_room_config

    .. automethod:: set_affiliation

    .. automethod:: set_room_config

    .. versionchanged:: 0.8

       This class was formerly known as :class:`aioxmpp.muc.Service`. It
       is still available under that name, but the alias will be removed in
       1.0.

    """
    on_muc_joined = aioxmpp.callbacks.Signal()

    def __init__(self, client, **kwargs):
        super().__init__(client, **kwargs)

        self._signal_tokens = [
            _connect_to_signal(
                client.on_stream_established,
                self._stream_established
            ),
            _connect_to_signal(
                client.on_stream_destroyed,
                self._stream_destroyed
            )
        ]

        self._pending_mucs = {}
        self._joined_mucs = {}

    def _send_join_presence(self, mucjid, history, nick, password):
        presence = aioxmpp.stanza.Presence()
        presence.to = mucjid.replace(resource=nick)
        presence.xep0045_muc = muc_xso.GenericExt()
        presence.xep0045_muc.password = password
        presence.xep0045_muc.history = history
        self.client.stream.enqueue(presence)

    def _stream_established(self):
        self.logger.debug("stream established, (re-)connecting to %d mucs",
                          len(self._pending_mucs))

        for muc, fut, nick, history in self._pending_mucs.values():
            if muc.joined:
                self.logger.debug("%s: resuming", muc.mucjid)
                muc._resume()
            self.logger.debug("%s: sending join presence", muc.mucjid)
            self._send_join_presence(muc.mucjid, history, nick, muc.password)

    def _stream_destroyed(self):
        self.logger.debug(
            "stream destroyed, preparing autorejoin and cleaning up the others"
        )

        new_pending = {}
        for muc, fut, *more in self._pending_mucs.values():
            if not muc.autorejoin:
                self.logger.debug(
                    "%s: pending without autorejoin -> ConnectionError",
                    muc.mucjid
                )
                fut.set_exception(ConnectionError())
            else:
                self.logger.debug(
                    "%s: pending with autorejoin -> keeping",
                    muc.mucjid
                )
                new_pending[muc.mucjid] = (muc, fut) + tuple(more)
        self._pending_mucs = new_pending

        for muc in list(self._joined_mucs.values()):
            if muc.autorejoin:
                self.logger.debug(
                    "%s: connected with autorejoin, suspending and adding to "
                    "pending",
                    muc.mucjid
                )
                muc._suspend()
                self._pending_mucs[muc.mucjid] = (
                    muc, None, muc.this_occupant.nick, muc_xso.History(
                        since=datetime.utcnow()
                    )
                )
            else:
                self.logger.debug(
                    "%s: connected with autorejoin, disconnecting",
                    muc.mucjid
                )
                muc._disconnect()

        self.logger.debug("state now: pending=%r, joined=%r",
                          self._pending_mucs,
                          self._joined_mucs)

    def _pending_join_done(self, mucjid, fut):
        if fut.cancelled():
            try:
                del self._pending_mucs[mucjid]
            except KeyError:
                pass
            unjoin = aioxmpp.stanza.Presence(
                to=mucjid,
                type_=aioxmpp.structs.PresenceType.UNAVAILABLE,
            )
            unjoin.xep0045_muc = muc_xso.GenericExt()
            self.client.stream.enqueue(unjoin)

    def _pending_on_enter(self, presence, occupant, **kwargs):
        mucjid = presence.from_.bare()
        try:
            pending, fut, *_ = self._pending_mucs.pop(mucjid)
        except KeyError:
            pass  # huh
        else:
            self.logger.debug("%s: pending -> joined",
                              mucjid)
            if fut is not None:
                fut.set_result(None)
            self._joined_mucs[mucjid] = pending

    def _inbound_muc_user_presence(self, stanza):
        mucjid = stanza.from_.bare()

        try:
            muc = self._joined_mucs[mucjid]
        except KeyError:
            try:
                muc, *_ = self._pending_mucs[mucjid]
            except KeyError:
                return
        muc._inbound_muc_user_presence(stanza)

    def _inbound_muc_presence(self, stanza):
        mucjid = stanza.from_.bare()
        try:
            pending, fut, *_ = self._pending_mucs.pop(mucjid)
        except KeyError:
            pass
        else:
            fut.set_exception(stanza.error.to_exception())

    @aioxmpp.service.inbound_presence_filter
    def _inbound_presence_filter(self, stanza):
        if stanza.xep0045_muc_user is not None:
            self._inbound_muc_user_presence(stanza)
            return None
        if stanza.xep0045_muc is not None:
            self._inbound_muc_presence(stanza)
            return None
        return stanza

    def _inbound_message(self, stanza):
        mucjid = stanza.from_.bare()
        try:
            muc = self._joined_mucs[mucjid]
        except KeyError:
            pass
        else:
            muc._inbound_message(stanza)

    def _muc_exited(self, muc, stanza, *args, **kwargs):
        try:
            del self._joined_mucs[muc.mucjid]
        except KeyError:
            _, fut, *_ = self._pending_mucs.pop(muc.mucjid)
            if not fut.done():
                fut.set_result(None)

    def get_muc(self, mucjid):
        try:
            return self._joined_mucs[mucjid]
        except KeyError:
            return self._pending_mucs[mucjid][0]

    @asyncio.coroutine
    def _shutdown(self):
        for muc, fut, *_ in self._pending_mucs.values():
            muc._disconnect()
            fut.set_exception(ConnectionError())
        self._pending_mucs.clear()

        for muc in list(self._joined_mucs.values()):
            muc._disconnect()
        self._joined_mucs.clear()

    def join(self, mucjid, nick, *,
             password=None, history=None, autorejoin=True):
        """
        Join a multi-user chat at `mucjid` with `nick`. Return a :class:`Room`
        instance which is used to track the MUC locally and a
        :class:`aioxmpp.Future` which becomes done when the join succeeded
        (with a :data:`None` value) or failed (with an exception).

        It is recommended to attach the desired signals to the :class:`Room`
        before yielding next, to avoid races with the server. It is guaranteed
        that no signals are emitted before the next yield, and thus, it is safe
        to attach the signals right after :meth:`join` returned. (This is also
        the reason why :meth:`join` is not a coroutine, but instead returns the
        room and a future to wait for.)

        Any other interaction with the room must go through the :class:`Room`
        instance.

        If the multi-user chat at `mucjid` is already or currently being
        joined, :class:`ValueError` is raised.

        If the `mucjid` is not a bare JID, :class:`ValueError` is raised.

        `password` may be a string used as password for the MUC. It will be
        remembered and stored at the returned :class:`Room` instance.

        `history` may be a :class:`History` instance to request a specific
        amount of history; otherwise, the server will return a default amount
        of history.

        If `autorejoin` is true, the MUC will be re-joined after the stream has
        been destroyed and re-established. In that case, the service will
        request history since the stream destruction and ignore the `history`
        object passed here.

        .. todo:

           Use the timestamp of the last received message instead of the
           timestamp of stream destruction.

        If the stream is currently not established, the join is deferred until
        the stream is established.
        """
        if history is not None and not isinstance(history, muc_xso.History):
            raise TypeError("history must be {!s}, got {!r}".format(
                muc_xso.History.__name__,
                history))

        if not mucjid.is_bare:
            raise ValueError("MUC JID must be bare")

        if mucjid in self._pending_mucs:
            raise ValueError("already joined")

        try:
            self.client.stream.register_message_callback(
                aioxmpp.structs.MessageType.GROUPCHAT,
                mucjid,
                self._inbound_message
            )
        except ValueError:
            raise RuntimeError(
                "message callback for MUC already in use"
            )

        room = Room(self, mucjid)
        room.autorejoin = autorejoin
        room.password = password
        room.on_exit.connect(
            functools.partial(
                self._muc_exited,
                room
            )
        )
        room.on_enter.connect(
            self._pending_on_enter,
        )

        fut = asyncio.Future()
        fut.add_done_callback(functools.partial(
            self._pending_join_done,
            mucjid
        ))
        self._pending_mucs[mucjid] = room, fut, nick, history

        if self.client.established:
            self._send_join_presence(mucjid, history, nick, password)

        return room, fut

    @asyncio.coroutine
    def set_affiliation(self, mucjid, jid, affiliation, *, reason=None):
        """
        Change the affiliation of the given `jid` with the MUC identified by
        the bare `mucjid` to the given new `affiliation`. Optionally, a
        `reason` can be given.

        If you are joined in the MUC, :meth:`Room.set_affiliation` may be more
        convenient, but it is possible to modify the affiliations of a MUC
        without being joined, given sufficient privilegues.

        Setting the different affiliations require different privilegues of the
        local user. The details can be checked in :xep:`0045` and are enforced
        solely by the server, not local code.

        The coroutine returns when the change in affiliation has been
        acknowledged by the server. If the server returns an error, an
        appropriate :class:`aioxmpp.errors.XMPPError` subclass is raised.
        """

        if mucjid is None or not mucjid.is_bare:
            raise ValueError("mucjid must be bare JID")

        if jid is None:
            raise ValueError("jid must not be None")

        if affiliation is None:
            raise ValueError("affiliation must not be None")

        iq = aioxmpp.stanza.IQ(
            type_=aioxmpp.structs.IQType.SET,
            to=mucjid
        )

        iq.payload = muc_xso.AdminQuery(
            items=[
                muc_xso.AdminItem(jid=jid,
                                  reason=reason,
                                  affiliation=affiliation)
            ]
        )

        yield from self.client.stream.send(
            iq
        )

    @asyncio.coroutine
    def get_room_config(self, mucjid):
        """
        Query and return the room configuration form for the given MUC.

        :param mucjid: JID of the room to query
        :type mucjid: bare :class:`~.JID`
        :return: data form template for the room configuration
        :rtype: :class:`aioxmpp.forms.Data`

        .. seealso::

           :class:`~.ConfigurationForm`
              for a form template to work with the returned form

        .. versionadded:: 0.7
        """

        if mucjid is None or not mucjid.is_bare:
            raise ValueError("mucjid must be bare JID")

        iq = aioxmpp.stanza.IQ(
            type_=aioxmpp.structs.IQType.GET,
            to=mucjid,
            payload=muc_xso.OwnerQuery(),
        )

        return (yield from self.client.stream.send(
            iq
        )).form

    @asyncio.coroutine
    def set_room_config(self, mucjid, data):
        """
        Set the room configuration using a :xep:`4` data form.

        :param mucjid: JID of the room to query
        :type mucjid: bare :class:`~.JID`
        :param data: Filled-out configuration form
        :type data: :class:`aioxmpp.forms.Data`

        .. seealso::

           :class:`~.ConfigurationForm`
              for a form template to generate the required form

        A sensible workflow to, for example, set a room to be moderated, could
        be this::

          form = aioxmpp.muc.ConfigurationForm.from_xso(
              (await muc_service.get_room_config(mucjid))
          )
          form.moderatedroom = True
          await muc_service.set_rooom_config(mucjid, form.render_reply())

        .. versionadded:: 0.7
        """

        iq = aioxmpp.stanza.IQ(
            type_=aioxmpp.structs.IQType.SET,
            to=mucjid,
            payload=muc_xso.OwnerQuery(form=data),
        )

        yield from self.client.stream.send(
            iq,
        )
