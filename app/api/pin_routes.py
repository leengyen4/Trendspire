# api/pin_routes.py
from flask import Blueprint, request, jsonify
from app.models import db, Pin
from flask_login import login_required, current_user

pin_routes = Blueprint('pin_routes', __name__)

@pin_routes.route('/', methods=['GET'])
def get_pins():
    pins = Pin.query.all()
    return jsonify([pin.to_dict() for pin in pins])

@pin_routes.route('/', methods=['POST'])
@login_required
def create_pin():
    data = request.get_json()
    
    # Check if data contains the required fields
    if not all(key in data for key in ['title', 'description', 'image_url']):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        new_pin = Pin(
            user_id=current_user.id,
            title=data['title'],
            description=data['description'],
            image_url=data['image_url']
        )

        db.session.add(new_pin)
        db.session.commit()
        return jsonify(new_pin.to_dict()), 201  # Return the created pin
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'message': 'Failed to create pin', 'error': str(e)}), 500

@pin_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin and pin.user_id == current_user.id:
        db.session.delete(pin)
        db.session.commit()
        return jsonify({'message': 'Pin deleted successfully'}), 200
    return jsonify({'message': 'Pin not found or unauthorized'}), 404

@pin_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_pin(id):
    pin = Pin.query.get(id)
    if pin and pin.user_id == current_user.id:
        data = request.get_json()
        pin.title = data['title']
        pin.description = data['description']
        pin.image_url = data['image_url']

        db.session.commit()
        return jsonify(pin.to_dict()), 200  # Return the updated pin
    return jsonify({'message': 'Pin not found or unauthorized'}), 404
