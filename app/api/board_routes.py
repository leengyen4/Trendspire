from flask import Blueprint, request, jsonify
from app.models import db, Board
from flask_login import login_required, current_user

board_routes = Blueprint('board_routes', __name__)

@board_routes.route('', methods=['GET'])
@login_required
def get_boards():
    boards = Board.query.filter_by(user_id=current_user.id).all()
    return jsonify([board.to_dict() for board in boards])

@board_routes.route('', methods=['POST'])
@login_required
def create_board():
    data = request.get_json()
    new_board = Board(
        user_id=current_user.id,
        title=data['title'],  # Changed from name to title
        description=data.get('description', '')
    )
    db.session.add(new_board)
    db.session.commit()
    return jsonify(new_board.to_dict()), 201

@board_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_board(id):
    data = request.get_json()
    board = Board.query.get(id)

    if board and board.user_id == current_user.id:
        board.title = data.get('title', board.title)  # Changed from name to title
        board.description = data.get('description', board.description)
        db.session.commit()
        return jsonify(board.to_dict()), 200

    return jsonify({'message': 'Board not found or unauthorized'}), 404

@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    board = Board.query.get(id)
    if board and board.user_id == current_user.id:
        db.session.delete(board)
        db.session.commit()
        return jsonify({'message': 'Board deleted successfully'}), 200
    return jsonify({'message': 'Board not found or unauthorized'}), 404
