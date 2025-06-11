# import flask
from flask import Flask, request, jsonify

# import model functions
from loadModelAndTokenizer import loadModelAndTokenizer
from evaluateArg import evaluateArg

from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Load model and tokenizer
tokenizer, model = loadModelAndTokenizer("austenem/arg-quality-regression")

@app.route("/")
def index():
    return "Hello world!"

@app.route("/evaluate", methods=['POST'])
def evaluate():
    # process request
    data = request.get_json()

    if 'arg' not in data or 'topic' not in data:
        return jsonify({'error': 'Missing argument or topic'}), 400
    
    # get quality score
    average_score, scores = evaluateArg(data['arg'], data['topic'], tokenizer, model)
    return jsonify({'average_score': average_score, 'scores': scores})
    

if __name__ == '__main__':
    app.run(port=8000, debug=True)