# In consumers.py
from channels import Group, Channel
from .models import ChatMessage
from otree.models import Participant
import json

def get_chat_group(channel):
    return 'otreechat-{}'.format(channel)

from channels.generic.websockets import JsonWebsocketConsumer

def msg_consumer(message):
    content = message.content

    # For now, don't create a model because we
    # don't yet have a way to export this table.
    # currently oTree admin is not extensible.

    channel = content['channel']
    grp = get_chat_group(channel)

    # list containing 1 element
    Group(grp).send({'text': json.dumps([content])})

    ChatMessage.objects.create(
        participant=Participant.objects.get(id=content['participant_id']),
        channel=content['channel'],
        body=content['body'],
        nickname=content['nickname']
    )


class ChatConsumer(JsonWebsocketConsumer):

    # Set to True if you want it, else leave it out
    strict_ordering = False

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        return [get_chat_group(kwargs['channel'])]

    def connect(self, message, **kwargs):
        history = ChatMessage.objects.filter(
            channel=kwargs['channel']).order_by('timestamp').values(
                'channel', 'nickname', 'body', 'participant_id'
        )

        # Convert ValuesQuerySet to list
        self.send(list(history))

    def receive(self, content, **kwargs):
        # Stick the message onto the processing queue
        Channel("otree.chat_messages").send(content)
