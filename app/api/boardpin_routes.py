from flask import Blueprint, request, jsonify
from app.models import db, BoardPin, Board, Pin  # Ensure the correct models are imported

boardpin_routes = Blueprint('boardpins', __name__)

# Get all pins for a specific board
@boardpin_routes.route('/<int:board_id>/pins', methods=['GET'])
def get_pins_for_board(board_id):
    # Querying the pins associated with the board
    board_pins = db.session.query(BoardPin, Pin).join(Pin).filter(BoardPin.board_id == board_id).all()
    
    # Returning pin details in the response
    return jsonify([{
        'board_pin_id': board_pin[0].id,
        'board_id': board_pin[0].board_id,
        'pin_id': board_pin[0].pin_id,
        'pin_title': board_pin[1].title,  # Example of including pin title
        'pin_description': board_pin[1].description,  # Example of including pin description
        'created_at': board_pin[0].created_at
    } for board_pin in board_pins])

# Add a pin to a board
@boardpin_routes.route('/<int:board_id>/pins/<int:pin_id>', methods=['POST'])
def add_pin_to_board(board_id, pin_id):
    # Check if the board and pin exist
    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)
    
    if not board:
        return jsonify({'error': 'Board not found'}), 404
    if not pin:
        return jsonify({'error': 'Pin not found'}), 404
    
    # Check if the pin is already added to the board
    existing_board_pin = BoardPin.query.filter_by(board_id=board.id, pin_id=pin.id).first()
    if existing_board_pin:
        return jsonify({'message': 'Pin is already added to this board'}), 400

    # Add the pin to the board using the association table
    new_board_pin = BoardPin(board_id=board.id, pin_id=pin.id)
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
