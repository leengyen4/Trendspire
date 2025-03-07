from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    # Ensure schema handling and unique constraint for user_id + pin_id
    __table_args__ = (
        {'schema': SCHEMA} if environment == "production" else {},  # Schema handling
        db.UniqueConstraint('user_id', 'pin_id', name='uix_user_pin')  # Unique constraint
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    overlaps = db.Column(db.Boolean, default=False)  # Track overlaps

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
