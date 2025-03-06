from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = (
            {'schema': SCHEMA}, 
            db.UniqueConstraint('user_id', 'pin_id', name='uix_user_pin')  # Ensure the combination of user_id and pin_id is unique
        )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey('pins.id'), nullable=False)
    overlaps = db.Column(db.Boolean, default=False)  # New column to track overlaps

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    pin = db.relationship('Pin', back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pin_id': self.pin_id,
            'overlaps': self.overlaps  # Include overlaps in the dictionary output
        }
