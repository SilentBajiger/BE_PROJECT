from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input
import cv2
import numpy as np
import os


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
    print("ITHE YEATY.............")
    score = cosine_similarity(ref_emb, test_emb) * 100
    print(f"✅ ResNet Cosine Similarity: {score:.2f}%")

    return score



def cosine_similarity_score(signature_dir,ref_filename):
    
    try:
    
        reference_image_path = f"./server_images/{ref_filename}"
        
        print("signature dir -: ",signature_dir)
        
        all_files = os.listdir(signature_dir)
        
        all_files = [f for f in all_files if os.path.isfile(os.path.join(signature_dir, f))]
        ans = []
        for pth in all_files:
            name_without_ext = os.path.splitext(pth)[0]
            print(name_without_ext)  # Output: example_image

            cropped_image_path = f"{signature_dir}/{name_without_ext}.jpg"
            print("CROPPDED PATH,",cropped_image_path)
            res = verify_signature_deep(reference_image_path, cropped_image_path)
            ans.append(res)
        
        result  = max(ans)
        print("Highest Score : " , result)
        return {"status":200,"msg":"Cosine Verification Done Successfully...","cosine_score":result}
    except BaseException as e:
        return {"status":201,"msg":f"Error in Cosine similarity Function {e}","cosine_score":0}