from .db import db, environment, SCHEMA, add_prefix_for_prod

class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='pins')
    board = db.relationship('Board', back_populates='pins')  # This is the reverse relationship
    comments = db.relationship('Comment', backref='pin_reference', lazy=True, cascade="all, delete-orphan", overlaps='user')
    favorites = db.relationship('Favorite', backref='pin_favorite_reference', lazy=True, cascade="all, delete-orphan")
    
    # New Relationship for BoardPin
    # board_pins = db.relationship('BoardPin', back_populates='pin', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }