import os
import re
from PIL import Image

fileNames = os.listdir("../frontend/src/assets/_uncompressed")

for file in fileNames:
    if file == ".DS_Store":
        continue
    im = Image.open("../frontend/src/assets/_uncompressed/" + file)
    fileName = re.findall("^([^.]+)", file)
    fileName = fileName[0]
    im = im.convert("RGB")
    #quality ranges from 1 (worst) to 95 (best, values >95 should be avoided)
    im.save("./convertedImage/" + fileName + ".jpg", quality=60)
