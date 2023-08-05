from enum import Enum


class EventType(Enum):
    # TODO finish the use of this
    hello = 'hello'
    message = 'message'

    accounts_changed = 'accounts_changed'
    """ The list of accounts a user is signed into has changed """

    bot_added = 'bot_added'
    """" An bot user was added """

    bot_changed = bot_changed
    """An bot user was changed """

    channel_archive = 'channel_archive'
    """ A channel was archived """

    channel_created = 'channel_created'
    """ A channel was created """

    channel_deleted = 'channel_deleted'
    """ A channel was deleted """

    channel_history_changed = 'channel_history_changed'
    """ Bulk updates were made to a channel's history """

channel_joined
You joined a channel

channel_left
You left a channel

channel_marked
Your channel read marker was updated

channel_rename
A channel was renamed

channel_unarchive
A channel was unarchived

commands_changed
A team slash command has been added or changed

dnd_updated
Do not Disturb settings changed for the current user

dnd_updated_user
Do not Disturb settings changed for a team member

email_domain_changed
The team email domain has changed

emoji_changed
A team custom emoji has been added or changed

file_change
A file was changed

file_comment_added
A file comment was added

file_comment_deleted
A file comment was deleted

file_comment_edited
A file comment was edited

file_created
A file was created

file_deleted
A file was deleted

file_public
A file was made public

file_shared
A file was shared

file_unshared
A file was unshared

goodbye
The server intends to close the connection soon.

group_archive
A private channel was archived

group_close
You closed a private channel

group_history_changed
Bulk updates were made to a private channel's history

group_joined
You joined a private channel

group_left
You left a private channel

group_marked
A private channel read marker was updated

group_open
You opened a private channel

group_rename
A private channel was renamed

group_unarchive
A private channel was unarchived

hello
The client has successfully connected to the server

im_close
You closed a DM

im_created
A DM was created

im_history_changed
Bulk updates were made to a DM's history

im_marked
A direct message read marker was updated

im_open
You opened a DM

manual_presence_change
You manually updated your presence

message
A message was sent to a channel

message.channels
A message was posted to a channel

message.groups
A message was posted to a private channel

message.im
A message was posted in a direct message channel

message.mpim
A message was posted in a multiparty direct message channel

pin_added
A pin was added to a channel

pin_removed
A pin was removed from a channel

pref_change
You have updated your preferences

presence_change
A team member's presence changed

reaction_added
A team member has added an emoji reaction to an item

reaction_removed
A team member removed an emoji reaction

reconnect_url
Experimental

star_added
A team member has starred an item

star_removed
A team member removed a star

subteam_created
A User Group has been added to the team

subteam_self_added
You have been added to a User Group

subteam_self_removed
You have been removed from a User Group

subteam_updated
An existing User Group has been updated or its members changed

team_domain_change
The team domain has changed

team_join
A new team member has joined

team_migration_started
The team is being migrated between servers

team_plan_change
The team billing plan has changed

team_pref_change
A team preference has been updated

team_profile_change
Team profile fields have been updated

team_profile_delete
Team profile fields have been deleted

team_profile_reorder
Team profile fields have been reordered

team_rename
The team name has changed

url_verification
Verifies ownership of an Request URL

user_change
A team member's data has changed

user_typing
A channel member is typing a message
