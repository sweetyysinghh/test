from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])
    full_name = request.json.get('full_name', '')
    dob = request.json.get('dob', '')

    user_id = f"{full_name.lower().replace(' ', '_')}_{dob}"
    email_domain = "example.com" 
    email = f"{full_name.lower().replace(' ', '_')}@{email_domain}"

    initials = ''.join([name[0].upper() for name in full_name.split()])
    roll_number = f"{initials}{dob}"

    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]

    lowercase_alphabets = [char for char in alphabets if char.islower()]
    highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

    response = {
        "is_success": True,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
    }
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    # Example response similar to POST response, but with fixed test data
    response = {
        "is_success": True,
        "user_id": "test_user_01011990",
        "email": "test_user@example.com",
        "roll_number": "TU01011990",
        "numbers": ["1", "2", "3"],
        "alphabets": ["A", "b", "C", "d"],
        "highest_lowercase_alphabet": ["d"]
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
