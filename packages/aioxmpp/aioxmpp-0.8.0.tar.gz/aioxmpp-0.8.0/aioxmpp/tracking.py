########################################################################
# File name: tracking.py
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
"""
:mod:`~aioxmpp.tracking` --- Interfaces for high-level message tracking
#######################################################################

This submodule provides interfaces for tracking messages to the recipient. The
actual tracking is not implemented here.

.. versionadded:: 0.5

   This module was added in version 0.5.

.. seealso::

   Method :meth:`~.muc.Room.send_tracked_message`
     implements tracking for messages sent through a MUC.

Interfaces
==========

.. autoclass:: MessageTracker

.. autoclass:: MessageState

"""
from enum import Enum

import aioxmpp.callbacks
import aioxmpp.statemachine
import aioxmpp.stream as stream


class MessageState(Enum):
    """
    Enumeration of possible states for :class:`MessageTracker`. These states
    are used to inform using code about the delivery state of a message. See
    :class:`MessageTracker` for details.

    .. attribute:: ABORTED

       The message has been aborted or dropped in the :class:`~.StanzaStream`
       queues. See :class:`~.StanzaToken` and :attr:`MessageTracker.token`.

       This is a final state.

    .. attribute:: TIMED_OUT

       The tracking has timed out. Whether a timeout exists and how it is
       handled depends on the tracking implementation.

       This is a final state.

    .. attribute:: CLOSED

       The tracking itself got aborted and cannot make a statement about the
       delivery of the stanza.

       This is a final state.

    .. attribute:: ERROR

       An error reply stanza has been received for the stanza which was sent.

       This is a final state.

    .. attribute:: IN_TRANSIT

       The message is still queued for sending or has been sent to the peer
       server without stream management.

    .. attribute:: DELIVERED_TO_SERVER

       The message has been delivered to the server and the server acked the
       delivery using stream management.

       Depending on the tracking implementation, this may be a final state.

    .. attribute:: DELIVERED_TO_RECIPIENT

       The message has been delivered to the recipient. Depending on the
       tracking implementation, this may be a final state.

    .. attribute:: SEEN_BY_RECIPIENT

       The recipient has marked the message as seen or read. This is a final
       state.

    """

    def __lt__(self, other):
        if     ((other == MessageState.ABORTED or
                 other == MessageState.CLOSED or
                 other == MessageState.ERROR) and
                self != MessageState.IN_TRANSIT):
            return True
        if     (other == MessageState.TIMED_OUT and
                self != MessageState.IN_TRANSIT and
                self != MessageState.DELIVERED_TO_SERVER):
            return True
        return self.value < other.value

    IN_TRANSIT = 0
    ABORTED = 1
    CLOSED = 2
    ERROR = 3
    DELIVERED_TO_SERVER = 4
    TIMED_OUT = 5
    DELIVERED_TO_RECIPIENT = 6
    SEEN_BY_RECIPIENT = 7


class MessageTracker(aioxmpp.statemachine.OrderedStateMachine):
    """
    This is the high-level equivalent of the :class:`~.StanzaToken`. This
    structure is used by different tracking implementations.

    This is also a :class:`.OrderedStateMachine`, so see there for other
    methods which allow waiting for a specific state.

    .. attribute:: state

       The current :class:`MessageState` of the :class:`MessageTracker`. Do
       **not** write to this attribute from user code. Writing to this
       attribute is intended only for the tracking implementation.

    .. attribute:: token

       The :class:`~.StanzaToken` of the message. This is usually set by the
       tracking implementation right when the tracker is initialised.

    .. signal:: on_state_change(state)

       The signal is emitted with the new state as its only argument when the
       state of the message tracker changes

    """

    on_state_change = aioxmpp.callbacks.Signal()

    def __init__(self, token=None):
        super().__init__(MessageState.IN_TRANSIT)
        self.token = token

    def on_stanza_state_change(self, token, stanza_state):
        new_state = self.state
        if stanza_state == stream.StanzaState.ABORTED:
            new_state = MessageState.ABORTED
        elif stanza_state == stream.StanzaState.DROPPED:
            new_state = MessageState.ABORTED
        elif stanza_state == stream.StanzaState.ACKED:
            new_state = MessageState.DELIVERED_TO_SERVER

        if new_state != self.state and not new_state < self.state:
            self.state = new_state

    @aioxmpp.statemachine.OrderedStateMachine.state.setter
    def state(self, new_state):
        aioxmpp.statemachine.OrderedStateMachine.state.fset(self, new_state)
        self.on_state_change(new_state)
