from flask import Flask, request, Response, jsonify
import sys
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    value = request.json['name']
    print(value, file=sys.stderr) 
    return jsonify({'yo': 'bro'})

if __name__ == '__main__':
    app.run(debug=True)