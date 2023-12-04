from flask import Flask

app = Flask(__name__)


# define routes
@app.route('/')
def index():
        return "Welcome"

@app.route('/api/data')
def get_data():
        return 'data from api'

if __name__ == '__main__':
        app.run(debug=True)