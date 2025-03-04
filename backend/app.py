import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Function to load the mock data from the json file
def load_data():
    with open("./backend/mock-data.json", "r") as file:
        return json.load(file)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = load_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
