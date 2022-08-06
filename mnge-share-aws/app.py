from flask import Flask, jsonify, request
import os

app = Flask(__name__)


@app.route('/')
def home():
    return "<h1>Hello World!</h1>"


@app.route("/createStorage", methods=['POST'])
def create_storage():
    print("data", request.json)
    for i in request.values:
        print("data", i)

    # print(os.mkdir(request.json['roomId']))
    return jsonify({"status": "success"})


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='
