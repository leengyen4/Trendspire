from flask import Blueprint, request, jsonify
from app.models import db, BoardPin  # Correct the model name to BoardPin

boardpin_routes = Blueprint('boardpins', __name__)

# Get all pins for a specific board
@boardpin_routes.route('/<int:board_id>/pins', methods=['GET'])
def get_pins_for_board(board_id):
    board_pins = BoardPin.query.filter_by(board_id=board_id).all()
    return jsonify([bp.to_dict() for bp in board_pins])

# Add a pin to a board
@boardpin_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['POST'])
def add_pin_to_board(board_id, pin_id):
    new_board_pin = BoardPin(board_id=board_id, pin_id=pin_id)
    db.session.add(new_board_pin)
    db.session.commit()
    return jsonify(new_board_pin.to_dict()), 201

# Remove a pin from a board
@boardpin_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['DELETE'])
def remove_pin_from_board(board_id, pin_id):
    board_pin = BoardPin.query.filter_by(board_id=board_id, pin_id=pin_id).first()
    if board_pin:
        db.session.delete(board_pin)
        db.session.commit()
        return jsonify({'message': 'Pin removed from board'}), 200
    return jsonify({'error': 'Pin not found in board'}), 404
