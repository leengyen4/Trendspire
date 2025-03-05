from app.models import db, Comment, Pin, User
from datetime import datetime

# Adds demo comments to the pins
def seed_comments():
    # Get some demo pins (you can adjust this part if needed)
    pin1 = Pin.query.first()  # Get the first pin (adjust this logic to your preference)
    pin2 = Pin.query.offset(1).first()  # Get the second pin (adjust if needed)
    pin3 = Pin.query.offset(2).first()  # Get the third pin (adjust if needed)

    # Get users
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    # Create comments for each pin
    comment1 = Comment(content="Love this pin!", user_id=demo_user.id, pin_id=pin1.id)
    comment2 = Comment(content="This is amazing!", user_id=marnie_user.id, pin_id=pin1.id)
    comment3 = Comment(content="So creative!", user_id=bobbie_user.id, pin_id=pin2.id)
    comment4 = Comment(content="This is beautiful!", user_id=demo_user.id, pin_id=pin2.id)
    comment5 = Comment(content="I would love to try this!", user_id=marnie_user.id, pin_id=pin3.id)
    comment6 = Comment(content="Incredible design!", user_id=bobbie_user.id, pin_id=pin3.id)

    # Add comments to the session
    db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6])

    # Commit the changes to the database
    db.session.commit()

# Undo the comments (if necessary for resets or development)
def undo_comments():
    db.session.execute("DELETE FROM comments")
    db.session.commit()
