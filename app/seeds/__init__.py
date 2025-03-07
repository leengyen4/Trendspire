from flask.cli import AppGroup
from .users import seed_users, undo_users
from .board_seeds import seed_boards, undo_boards
from .pin_seeds import seed_pins, undo_pins
from .comment_seeds import seed_comments, undo_comments
from .favorite_seeds import seed_favorites, undo_favorites
from .boardpin_seeds import seed_board_pins, undo_board_pins

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, truncate tables
        undo_users()
        undo_boards()
        undo_pins()
        undo_comments()
        undo_favorites()
        undo_board_pins()  # Added BoardPin undo

    seed_users()
    seed_boards()
    seed_pins()
    seed_comments()
    seed_favorites()
    seed_board_pins()  # Added BoardPin seeding


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_boards()
    undo_pins()
    undo_comments()
    undo_favorites()
    undo_board_pins()  # Added BoardPin undo
