from flask import Flask
from flask_cors import CORS
from routes.jobs.index import jobs_blueprint

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
        return "modular todos app server api"

#registered modular routes
app.register_blueprint(jobs_blueprint, url_prefix="/jobs")

if __name__ == '__main__':
    app.run(debug=True)