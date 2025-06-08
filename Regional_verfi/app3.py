import sys
import subprocess

subprocess.run([
    sys.executable,  # this ensures it uses the active venv's python
    "./yolov5/detect.py",
    "--weights", "./best.pt",
    "--img", "640",
    "--conf", "0.70",
    "--source", "./tejas_12th.jpeg",
    "--save-crop"
])
