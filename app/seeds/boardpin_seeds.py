from app.models import db, BoardPin, environment, SCHEMA
from sqlalchemy.sql import text

def seed_board_pins():
    board_pin1 = BoardPin(board_id=1, pin_id=2)
    board_pin2 = BoardPin(board_id=1, pin_id=3)
    board_pin3 = BoardPin(board_id=2, pin_id=1)
    board_pin4 = BoardPin(board_id=2, pin_id=4)
    board_pin5 = BoardPin(board_id=3, pin_id=5)

    db.session.add_all([board_pin1, board_pin2, board_pin3, board_pin4, board_pin5])
    db.session.commit()

def undo_board_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.board_pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM board_pins"))
    
    db.session.commit()
