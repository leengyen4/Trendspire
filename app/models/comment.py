from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    # Apply schema handling based on environment (production or development)
        if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    overlaps = db.Column(db.Boolean, default=False)  # Tracks overlaps, if necessary

    # Relationships
    user = db.relationship('User', back_populates='comments')
    pin = db.relationship('Pin', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'pin_id': self.pin_id,
            'overlaps': self.overlaps  # Include overlaps in the dictionary output
        }
