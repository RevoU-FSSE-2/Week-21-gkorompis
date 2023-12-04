from flask import Flask
from routes.jobs.index import jobs_blueprint

app = Flask(__name__)

@app.route('/')
def index():
        return "modular todos app server api"

#registered modular routes
app.register_blueprint(jobs_blueprint, url_prefix="/jobs")


if __name__ == '__main__':
    app.run(debug=True)