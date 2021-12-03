from flask import Flask, request, send_from_directory, make_response, Response, jsonify
from flask_cors import CORS
from flask_compress import Compress
from src.db_initializer import DBInitializer
from src.exceptions.element_not_found_exception import ElementNotFoundException
from src.exceptions.gift_already_claimed_exception import GiftAlreadyClaimedException
from src.exceptions.gift_not_claimed_by_provided_user_exception import GiftNotClaimedByProvidedUserException
from src.exceptions.model_validation_exception import ModelValidationException
from src.models.gift import Gift
from src.models.token import Token
from src.repositories.user_repository import UserRepository
from src.repositories.gift_repository import GiftRepository
from src.config_provider import ConfigProvider
from src.utils import http_methods, hashing

print('Starting app')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
compress = Compress(app)

db_initializer = DBInitializer()
db_initializer.init_db()


@app.before_request
def before_request_callback():
    request.token = None
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return
    try:
        request.token = Token.from_jwt(auth_header)
    except Exception as e:
        print(e)


@app.route('/api/users', methods=[http_methods.GET])
def get_users():
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = UserRepository()
    try:
        users = repo.get_all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/users/<username>', methods=[http_methods.GET])
def get_user_by_username(username: str):
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = UserRepository()
    try:
        user = repo.get_by_username(username)
        if not user:
            return jsonify({
                'message': 'User not found'
            }), 400
        return jsonify(user.to_dict())
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/auth/login', methods=[http_methods.POST])
def login():
    repo = UserRepository()
    user = repo.get_by_credentials(
        request.json.get('username'),
        hashing.hash_password(request.json.get('password'))
    )
    if user:
        return jsonify({
            'token': Token.from_user(user).to_jwt()
        })
    return jsonify({'message': 'Forbidden'}), 403


@app.route('/api/gifts', methods=[http_methods.POST])
def create_gift():
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    gift_dict = request.json
    if 'gift_id' in gift_dict:
        del gift_dict['gift_id']
    gift_dict['username'] = request.token.username
    gift = Gift.from_dict(gift_dict)
    try:
        gift.validate()
        repo.create_gift(gift)
        return jsonify({}), 201
    except ModelValidationException as e:
        return jsonify({
            'message': str(e)
        }), 400
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts', methods=[http_methods.PUT])
def update_gift():
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    gift_dict = request.json
    gift_dict['username'] = request.token.username
    gift = Gift.from_dict(gift_dict)
    try:
        repo.update_gift(gift)
        return jsonify({})
    except ModelValidationException as e:
        return jsonify({
            'message': str(e)
        }), 400
    except ElementNotFoundException as e:
        return jsonify({
            'message': 'Gift not found'
        }), 400
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts', methods=[http_methods.GET])
def get_my_gifts():
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    gifts = repo.get_user_gifts(request.token.username)
    return jsonify([gift.to_dict() for gift in gifts])


@app.route('/api/gifts/<username>', methods=[http_methods.GET])
def get_user_gifts(username: str):
    if not request.token or request.token.username == username:
        return jsonify({'message': 'Forbidden'}), 403
    gift_repo = GiftRepository()
    user_repo = UserRepository()
    gifts = gift_repo.get_user_gifts(username)
    mapped_gifts = [gift.to_dict() for gift in gifts]
    for mapped_gift in mapped_gifts:
        if mapped_gift['claimer']:
            mapped_gift['claimer'] = user_repo.get_by_username(mapped_gift['claimer']).to_dict()
        mapped_gift['user'] = user_repo.get_by_username(mapped_gift['username']).to_dict()
    return jsonify(mapped_gifts)


@app.route('/api/gifts/<username>/<gift_id>', methods=[http_methods.GET])
def get_gift(username: str, gift_id: str):
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    try:
        gift = repo.get(username, gift_id)
        if not gift:
            return jsonify({
                'message': 'Gift not found'
            }), 400
        return jsonify(gift.to_dict())
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts/<gift_id>', methods=[http_methods.DELETE])
def delete_gift(gift_id: str):
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    try:
        repo.delete(request.token.username, gift_id)
        return jsonify({})
    except ElementNotFoundException as e:
        return jsonify({
            'message': 'Gift not found'
        }), 400
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts/<username>/<gift_id>/claim', methods=[http_methods.POST])
def claim_gift(username: str, gift_id: str):
    if not request.token or request.token.username == username:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    try:
        repo.claim(request.token.username, gift_id)
        return jsonify({})
    except ElementNotFoundException as e:
        return jsonify({
            'message': 'Gift not found'
        }), 400
    except GiftAlreadyClaimedException as e:
        return jsonify({
            'message': 'Gift already claimed'
        }), 400
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts/<username>/<gift_id>/unclaim', methods=[http_methods.POST])
def unclaim_gift(username: str, gift_id: str):
    if not request.token or request.token.username == username:
        return jsonify({'message': 'Forbidden'}), 403
    repo = GiftRepository()
    try:
        repo.unclaim(request.token.username, gift_id)
        return jsonify({})
    except ElementNotFoundException as e:
        return jsonify({
            'message': 'Gift not found'
        }), 400
    except GiftNotClaimedByProvidedUserException as e:
        return jsonify({
            'message': 'Gift not claimed'
        }), 400
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/api/gifts/claims', methods=[http_methods.GET])
def my_claimed_gifts():
    if not request.token:
        return jsonify({'message': 'Forbidden'}), 403
    gift_repo = GiftRepository()
    user_repo = UserRepository()
    try:
        gifts = gift_repo.get_user_claims(request.token.username)
        mapped_gifts = [gift.to_dict() for gift in gifts]
        for mapped_gift in mapped_gifts:
            if mapped_gift['claimer']:
                mapped_gift['claimer'] = user_repo.get_by_username(mapped_gift['claimer']).to_dict()
            mapped_gift['user'] = user_repo.get_by_username(mapped_gift['username']).to_dict()
        return jsonify(mapped_gifts)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/', methods=[http_methods.GET])
@compress.compressed()
def root():
    return send_from_directory(ConfigProvider.CLIENT_APP_FOLDER, 'index.html', max_age=-1)


@app.route('/<path:path>', methods=[http_methods.GET])
@compress.compressed()
def static_file(path):
    return send_from_directory(ConfigProvider.CLIENT_APP_FOLDER, path, max_age=-1)


def run():
    app.run(debug=ConfigProvider.RUN_DEBUG_MODE,
            use_reloader=ConfigProvider.USE_RELOADER,
            port=ConfigProvider.APP_PORT)
