from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class FavoritePinForm(FlaskForm):
    pin_id = IntegerField('Pin ID', validators=[DataRequired()])
