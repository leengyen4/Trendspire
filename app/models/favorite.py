from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    
    # Apply schema handling correctly based on environment
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}  # Apply schema in production environment


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    overlaps = db.Column(db.Boolean, default=False)  # Track overlaps

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    pin = db.relationship('Pin', back_populates='favorites', overlaps='pin_favorite_reference')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pin_id': self.pin_id,
            'overlaps': self.overlaps  # Include overlaps in the dictionary output
        }
