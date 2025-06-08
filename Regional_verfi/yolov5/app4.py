import subprocess

subprocess.run([
    "python", "./yolov5/detect.py",
    "--weights", "../best.pt",
    "--img", "640",
    "--conf", "0.25",
    "--source", "./tejas_12th.jpeg",
    "--save-crop"
])
