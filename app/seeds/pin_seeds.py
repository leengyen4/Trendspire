from app.models import db, Pin, Board, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo pins to the database
def seed_pins():
    # Fetch demo boards from the database
    demo_boards = Board.query.filter_by(user_id=User.query.filter_by(username='Demo').first().id).all()
    marnie_boards = Board.query.filter_by(user_id=User.query.filter_by(username='marnie').first().id).all()
    bobbie_boards = Board.query.filter_by(user_id=User.query.filter_by(username='bobbie').first().id).all()

    # Create demo pins for each board with unique titles and descriptions
    pins = [
        # Demo user pins
        Pin(user_id=demo_boards[0].user_id, title='Mountains Adventure', description='Exploring the beautiful mountains.', image_url='https://example.com/image1.jpg', board_id=demo_boards[0].id),
        Pin(user_id=demo_boards[0].user_id, title='Camping Essentials', description='Must-have items for camping.', image_url='https://example.com/image2.jpg', board_id=demo_boards[0].id),
        Pin(user_id=demo_boards[1].user_id, title='Hiking Trails', description='Top hiking trails around the world.', image_url='https://example.com/image3.jpg', board_id=demo_boards[1].id),
        Pin(user_id=demo_boards[1].user_id, title='Backpacking Tips', description='Tips for an unforgettable backpacking experience.', image_url='https://example.com/image4.jpg', board_id=demo_boards[1].id),
        Pin(user_id=demo_boards[2].user_id, title='Zero Waste Living', description='How to live sustainably and reduce waste.', image_url='https://example.com/image5.jpg', board_id=demo_boards[2].id),

        # Marnie user pins
        Pin(user_id=marnie_boards[0].user_id, title='Cityscape Photography', description='Capturing the beauty of the city.', image_url='https://example.com/image6.jpg', board_id=marnie_boards[0].id),
        Pin(user_id=marnie_boards[1].user_id, title='Street Art in Paris', description='Exploring the colorful street art of Paris.', image_url='https://example.com/image7.jpg', board_id=marnie_boards[1].id),
        Pin(user_id=marnie_boards[2].user_id, title='Nightlife in New York', description='Discover the vibrant nightlife of New York.', image_url='https://example.com/image8.jpg', board_id=marnie_boards[2].id),

        # Bobbie user pins
        Pin(user_id=bobbie_boards[0].user_id, title='Best Travel Destinations', description='Top travel spots to visit in 2025.', image_url='https://example.com/image9.jpg', board_id=bobbie_boards[0].id),
        Pin(user_id=bobbie_boards[1].user_id, title='Street Food in Bangkok', description='Must-try street food in Bangkok.', image_url='https://example.com/image10.jpg', board_id=bobbie_boards[1].id),
        Pin(user_id=bobbie_boards[2].user_id, title='Future Tech Innovations', description='Latest tech gadgets and trends.', image_url='https://example.com/image11.jpg', board_id=bobbie_boards[2].id)
    ]

    # Add pins to the session
    db.session.add_all(pins)
    db.session.commit()

    print("Pins seeded successfully!")


# Removes all pins from the database
def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))
    
    db.session.commit()
    print("Pins undone successfully!")
