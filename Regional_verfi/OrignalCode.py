import torch
import cv2
import numpy as np
import os
import pathlib
import matplotlib.pyplot as plt
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input
import sys
import subprocess

directory = "./yolov5/runs/detect"
file_count = len(os.listdir(directory))  # counts all entries (files + folders)
print("Total items:", file_count)
if file_count == 0:
    file_count = ""
else:
    file_count += 1

cropped_image_path = f"yolov5/runs/detect/exp{file_count}/crops/Signature-Detection/_12th.jpg"
reference_image_path = "./ref.png"
source_image_path = "./_12th.jpg"

subprocess.run([
    sys.executable,  # this ensures it uses the active venv's python
    "./yolov5/detect.py",
    "--weights", "./best.pt",
    "--img", "640",
    "--conf", "0.50",
    "--source", source_image_path,
    "--save-crop"
])




# Load YOLO-detected cropped signature (grayscale)
detected_signature = cv2.imread(cropped_image_path, 0)
# detected_signature = cv2.imread("yolov5/runs/detect/exp2/crops/Signature-Detection/tejas_12th.jpg", 0)

# Load reference signature (grayscale)
reference_signature = cv2.imread(reference_image_path, 0)
# reference_signature = cv2.imread("./ref_tejas.png", 0)


# Initialize SIFT detector
sift = cv2.SIFT_create()

# Compute keypoints and descriptors
kp1, des1 = sift.detectAndCompute(reference_signature, None)
kp2, des2 = sift.detectAndCompute(detected_signature, None)

# Check for valid descriptors
if des1 is None or des2 is None:
    print("❌ Not enough features detected.")
else:
    # FLANN-based matcher
    index_params = dict(algorithm=1, trees=5)
    search_params = dict(checks=50)
    flann = cv2.FlannBasedMatcher(index_params, search_params)

    matches = flann.knnMatch(des1, des2, k=2)

    # Lowe's ratio test
    good_matches = [m for m, n in matches if m.distance < 0.7 * n.distance]

    match_percent = len(good_matches) / len(kp1) * 100
    print(f"✅ SIFT Match Score: {match_percent:.2f}%")

    # Optional: draw and show matches
    match_img = cv2.drawMatches(reference_signature, kp1, detected_signature, kp2, good_matches[:10], None, flags=2)
    plt.figure(figsize=(12,6))
    plt.imshow(match_img)
    plt.title("Top 10 SIFT Matches")
    plt.axis('off')
    plt.show()

#--------------------------------------------Cosine

# Build ResNet50 feature extractor
def build_resnet_model():
    base = ResNet50(weights="imagenet", include_top=False, input_shape=(224,224,3))
    gap = GlobalAveragePooling2D()(base.output)
    model = Model(inputs=base.input, outputs=gap)
    return model

# Image preprocessing
def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    arr = img_to_array(img)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)
    return arr

# Cosine similarity
def cosine_similarity(a, b):
    a = a.flatten()
    b = b.flatten()
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Main verification function
def verify_signature_deep(reference_path, detected_path):
    model = build_resnet_model()
    ref_input = preprocess_image(reference_path)
    test_input = preprocess_image(detected_path)

    ref_emb = model.predict(ref_input, verbose=0)
    test_emb = model.predict(test_input, verbose=0)

    score = cosine_similarity(ref_emb, test_emb) * 100
    return f"✅ ResNet Cosine Similarity: {score:.2f}%"


res = verify_signature_deep(reference_image_path, cropped_image_path)

print(res)