import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    
    # Add environment and SCHEMA directly here
    environment = "development"  # You can change it based on your environment (development, production, etc.)
    SCHEMA = "your_schema_name"  # Update this based on your schema name if needed