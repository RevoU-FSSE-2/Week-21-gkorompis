from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from routes.jobs.index import jobs_blueprint, jobs_params_blueprint
from routes.tweets.index import tweets_blueprint, tweets_params_blueprint, tweets_aggregator_params_blueprint
from routes.profiles.index import profiles_blueprint, profiles_params_blueprint, profile_aggregator_params_blueprint
from routes.users.index import users_blueprint, users_params_blueprint

from routes.auth.index import auth_blueprint

from utils.global_env import JWT_SECRET_KEY

app = Flask(__name__)

# CORS(app, resources={r"/api/*": {"origins": "http://example.com"}})
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

@app.route('/')
def index():
        message = "modular todos app server api"
        return  message

#registered modular routes
app.register_blueprint(jobs_blueprint, url_prefix="/jobs")
app.register_blueprint(jobs_params_blueprint, url_prefix="/jobs/<id>")


app.register_blueprint(tweets_blueprint, url_prefix="/tweets")
app.register_blueprint(tweets_params_blueprint, url_prefix="/tweets/<id>")
app.register_blueprint(tweets_aggregator_params_blueprint)


app.register_blueprint(profiles_blueprint, url_prefix="/profiles")
app.register_blueprint(profiles_params_blueprint, url_prefix="/profiles/<id>")
app.register_blueprint(profile_aggregator_params_blueprint)


app.register_blueprint(users_blueprint, url_prefix="/users")
app.register_blueprint(users_params_blueprint, url_prefix="/users/<id>")


app.register_blueprint(auth_blueprint, url_prefix="/auth/login")

cors = CORS(app, supports_credentials=True)

@app.errorhandler(404)
def not_found_error(error):
    errorMessage = {"message": str(error)}
    return jsonify(errorMessage), 404

# def lambda_handler(event, context):
#       return awsgi.response(app, event, context)

if __name__ == '__main__':
    app.run(debug=True)