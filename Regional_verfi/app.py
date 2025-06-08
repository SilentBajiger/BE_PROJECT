from flask import Flask, request, jsonify
from flask_cors import CORS
from functions.store_on_server import store_on_server
from functions.sift_verfication import sift_verfication
from functions.cosine_similarity_score import cosine_similarity_score
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for local React dev

UPLOAD_FOLDER = 'server_images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/")
def home():
    return jsonify({"msg":"OK"})


@app.route('/upload',methods=['POST'])
def upload_file():
    try:
        print("Welcom.....")
       
        original = request.files.get('original')
        ref = request.files.get('ref')
        
        if not original :
            return jsonify({'error': 'Missing text or image'}), 400
        
        status , msg , og_filename , ref_filename = store_on_server(original,ref).values()
        print(f" status : {status} og_filename : {og_filename}  ref_filename : {ref_filename} ", )
        if status != 200:
            return jsonify({"status":201,'msg': msg}), 201
        
        # print(og_filename)
        # print(ref_filename)
        
        sift_result = sift_verfication(og_filename, ref_filename)
        status = sift_result["status"]
        msg = sift_result["msg"]
        sift_score = float(sift_result["sift_score"])  # convert to float if from NumPy
        signature_dir = sift_result["signature_dir"]
        print(f" status : {status} sift_score : {sift_score} " )
        
        if status != 200:
            return jsonify({"status":201,"msg": msg}), 201
        
        result = cosine_similarity_score(signature_dir, ref_filename)
        status = result["status"]
        msg = result["msg"]
        cosine_score = float(result["cosine_score"])  # in case it's a NumPy float

        
        print(f" status : {status} COSINE_SCORE : {cosine_score} ", )
        if status != 200:
            return jsonify({"status":201,"msg": msg}), 201
        
        return jsonify({
            "status":200,
            'msg': 'Verifcation Done',
            'sift_score':float(sift_score),
            "cosine_score":float(cosine_score)
        }), 200
    except BaseException as e:
        print(f"Error on Python Server {e}")
        return jsonify({
            "status":201,
            'msg': f"Error on Python Server {e}",
            'sift_score': 0,
            "cosine_score":0
        }), 201

if __name__ == '__main__':
    app.run(debug=True, port=8000)
