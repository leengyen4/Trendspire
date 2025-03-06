from app.models import db, Board, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo boards to the database
def seed_boards():
    # Fetch demo users from the database
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    # Create 3 boards for each user with unique names
    boards = [
        Board(user_id=demo_user.id, title='Nature Explorers', description='Board for nature lovers and explorers'),
        Board(user_id=demo_user.id, title='Adventure Awaits', description='Board for adventure and outdoor activities'),
        Board(user_id=demo_user.id, title='Sustainable Living', description='Board for sustainability and eco-friendly ideas'),

        Board(user_id=marnie_user.id, title='City Life', description='Urban lifestyle and cityscapes'),
        Board(user_id=marnie_user.id, title='Street Art', description='Board for street art and graffiti'),
        Board(user_id=marnie_user.id, title='Nightlife Vibes', description='Board for the best nightlife scenes'),

        Board(user_id=bobbie_user.id, title='Travel Diaries', description='Board for travel destinations and adventures'),
        Board(user_id=bobbie_user.id, title='Foodie Finds', description='Board for food lovers and restaurant recommendations'),
        Board(user_id=bobbie_user.id, title='Tech Trends', description='Board for the latest tech gadgets and innovations')
    ]

    # Add boards to the session
    db.session.add_all(boards)
    db.session.commit()

    print("Boards seeded successfully!")


# Removes all boards from the database
def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
    
    db.session.commit()
    print("Boards undone successfully!")
