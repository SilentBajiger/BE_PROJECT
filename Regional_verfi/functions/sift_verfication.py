import torch
import cv2
import numpy as np
import os
import pathlib
import matplotlib.pyplot as plt
# from tensorflow.keras.applications import ResNet50
# from tensorflow.keras.models import Model
# from tensorflow.keras.layers import GlobalAveragePooling2D
# from tensorflow.keras.preprocessing.image import img_to_array
# from tensorflow.keras.applications.resnet50 import preprocess_input
import sys
import subprocess



def sift_verfication(og_filename,ref_filename):
    
    try:
        print("ITHE......")
        directory = "./yolov5/runs/detect"
        file_count = len(os.listdir(directory))  # counts all entries (files + folders)
        print("Total items:", file_count)
        if file_count == 0:
            file_count = ""
        else:
            file_count += 1
            
        
        # filename = "example_image.png"
        name_without_ext = os.path.splitext(og_filename)[0]
        print(name_without_ext)  # Output: example_image
        
        cropped_image_path = f"./yolov5/runs/detect/exp{file_count}/crops/Signature-Detection/{name_without_ext}.jpg"
        reference_image_path = f"./server_images/{ref_filename}"
        source_image_path = f"./server_images/{og_filename}"
        
        print("CROPPED : " , cropped_image_path)
        print("REFERENCE : " , reference_image_path)
        print("SOURCE: ",source_image_path)

        subprocess.run([
            sys.executable,  # this ensures it uses the active venv's python
            "./yolov5/detect.py",
            "--weights", "./best.pt",
            "--img", "640",
            "--conf", "0.50",
            "--source", source_image_path,
            "--save-crop"
        ])
        
        print("Cropped Successfully.........")
        
        signature_dir = f"./yolov5/runs/detect/exp{file_count}/crops/Signature-Detection"
        all_files = os.listdir(signature_dir)

    # Optional: filter only files (exclude directories)
        all_files = [f for f in all_files if os.path.isfile(os.path.join(signature_dir, f))]

        print("***************",all_files)

        ans = []

        for pth in all_files:
            # cropped_image_path = pth
            name_without_ext = os.path.splitext(pth)[0]
            print(name_without_ext)  # Output: example_image

            cropped_image_path = f"./yolov5/runs/detect/exp{file_count}/crops/Signature-Detection/{name_without_ext}.jpg"
            
            
            detected_signature = cv2.imread(cropped_image_path, 0)
        
            reference_signature = cv2.imread(reference_image_path, 0)

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
                ans.append(match_percent)
        
        print(max(ans))
        result = max(ans)
        
        # if result > 60:
        #     return True , signature_dir
        
        # return False , signature_dir
        return {"status":200,"msg":"sift verification Done...","sift_score":result,"signature_dir":signature_dir}
    except BaseException as e:
        print(f"Error in sift_verification : {e}")
        return {"status":201,"msg":f"Error in sift_verification : {e}","sift_score":0,"signature_dir":"null"}
