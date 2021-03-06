import os


class ConfigProvider:
    RUN_DEBUG_MODE = os.environ.get('DEBUG_MODE', 'False').lower() == 'true'
    USE_RELOADER = os.environ.get('USE_RELOADER', 'False').lower() == 'true'
    APP_PORT = os.environ.get('PORT', 5000)
    GOOGLE_JSON_TOKEN = os.environ.get('GOOGLE_JSON_TOKEN')
    GOOGLE_SHEET_DB_NAME = os.environ.get('GOOGLE_SHEET_DB_NAME')
    JWT_SECRET = os.environ.get('JWT_SECRET', 'jwt_insecure_secret')
    CLIENT_APP_FOLDER = '../web'
