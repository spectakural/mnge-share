from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/createroom')
def create_room():
    return jsonify({'room': 'created'})
