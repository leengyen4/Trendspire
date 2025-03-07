# app/seeds/favorite_seeds.py
from app.models import db, Favorite, User, Pin
from app.config import Config  # Import Config to get environment and SCHEMA
from sqlalchemy.sql import text

# Adds demo favorites to the pins
def seed_favorites():
    # Get some demo users
    user1 = User.query.filter_by(username='Demo').first()  # Retrieve demo user
    user2 = User.query.filter_by(username='marnie').first()  # Retrieve marnie user
    user3 = User.query.filter_by(username='bobbie').first()  # Retrieve bobbie user

    # Get some demo pins (adjust this if needed)
    pin1 = Pin.query.first()  # Get the first pin
    pin2 = Pin.query.offset(1).first()  # Get the second pin
    pin3 = Pin.query.offset(2).first()  # Get the third pin

    # Add demo favorites (each user favorites different pins)
    favorite1 = Favorite(user_id=user1.id, pin_id=pin1.id)
    favorite2 = Favorite(user_id=user1.id, pin_id=pin2.id)
    favorite3 = Favorite(user_id=user2.id, pin_id=pin1.id)
    favorite4 = Favorite(user_id=user2.id, pin_id=pin3.id)
    favorite5 = Favorite(user_id=user3.id, pin_id=pin2.id)
    favorite6 = Favorite(user_id=user3.id, pin_id=pin3.id)

    db.session.add_all([favorite1, favorite2, favorite3, favorite4, favorite5, favorite6])
    db.session.commit()

# Undo function to delete the favorites
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
    db.session.commit()
