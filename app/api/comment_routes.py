from flask import Blueprint, request, jsonify
from app.models import db, Comment
from flask_login import login_required, current_user

comment_routes = Blueprint('comment_routes', __name__)

# Create a comment
@comment_routes.route('', methods=['POST'])
@login_required
def create_comment():
    data = request.get_json()
    new_comment = Comment(
        user_id=current_user.id,
        pin_id=data['pin_id'],
        content=data['content']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.to_dict()), 201

# Get all comments for a specific pin
@comment_routes.route('/<int:pin_id>', methods=['GET'])
def get_comments(pin_id):
    comments = Comment.query.filter_by(pin_id=pin_id).all()
    return jsonify([comment.to_dict() for comment in comments])

# Update a comment (only by the user who created it)
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    data = request.get_json()
    comment = Comment.query.get(id)
    if comment and comment.user_id == current_user.id:
        comment.content = data['content']
        db.session.commit()
        return jsonify(comment.to_dict())
    return jsonify({'message': 'Comment not found or unauthorized'}), 404

# Delete a comment (only by the user who created it)
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    return jsonify({'message': 'Comment not found or unauthorized'}), 404
