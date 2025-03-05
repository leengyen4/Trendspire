# api/comment_routes.py
from flask import Blueprint, request, jsonify
from app.models import db, Comment
from flask_login import login_required, current_user

comment_routes = Blueprint('comment_routes', __name__)

@comment_routes.route('/', methods=['POST'])
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
