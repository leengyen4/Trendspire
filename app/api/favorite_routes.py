# api/favorite_routes.py
from flask import Blueprint, request, jsonify
from app.models import db, Favorite
from flask_login import login_required, current_user

favorite_routes = Blueprint('favorite_routes', __name__)

@favorite_routes.route('/', methods=['GET'])
@login_required
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify([favorite.to_dict() for favorite in favorites])

@favorite_routes.route('/', methods=['POST'])
@login_required
def create_favorite():
    data = request.get_json()
    new_favorite = Favorite(
        user_id=current_user.id,
        pin_id=data['pin_id']
    )
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.to_dict()), 201

@favorite_routes.route('', methods=['DELETE'])
@login_required
def delete_favorite():
    data = request.get_json()
    favorite = Favorite.query.filter_by(user_id=current_user.id, pin_id=data['pin_id']).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Favorite removed'}), 200
    return jsonify({'message': 'Favorite not found'}), 404
