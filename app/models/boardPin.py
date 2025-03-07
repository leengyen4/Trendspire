from .db import db, environment, SCHEMA, add_prefix_for_prod

class BoardPin(db.Model):
    __tablename__ = 'boardPins'

    # Apply schema handling correctly based on environment
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}  # Apply schema in production environment


    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Relationships (fixed indentation)
    board = db.relationship('Board', back_populates='boardPins')
    pin = db.relationship('Pin', back_populates='boardPins')

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'pin_id': self.pin_id,
            'created_at': self.created_at
        }
