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
    new_pin = Pin(
        user_id=current_user.id,
        title=data['title'],
        description=data['description'],
        image_url=data['image_url']
    )
    db.session.add(new_pin)
    db.session.commit()
    return jsonify(new_pin.to_dict()), 201

@pin_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin and pin.user_id == current_user.id:
        db.session.delete(pin)
        db.session.commit()
        return jsonify({'message': 'Pin deleted successfully'}), 200
    return jsonify({'message': 'Pin not found or unauthorized'}), 404