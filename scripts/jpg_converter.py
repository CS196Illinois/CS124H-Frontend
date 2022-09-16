import os
import re
from PIL import Image

fileNames = os.listdir(
    "../frontend/src/assets/staff_pictures/staff_picturesFA22/")
file_names = []
for file in fileNames:
    if file == ".DS_Store":
        continue
    im = Image.open(
        "../frontend/src/assets/staff_pictures/staff_picturesFA22/" + file)
    i = len(file) - 1
    while file[i] != '.':
        i -= 1
    fileName = file[:i]
    fileName = fileName.split(' ')
    newName = fileName[-2] + fileName[-1]
    file_names.append(newName)
    im = im.convert("RGB")
    #quality ranges from 1 (worst) to 95 (best, values >95 should be avoided)
    im.save("../frontend/src/assets/staff_pictures/staff_picturesFA22/" +
            newName + ".jpg",
            quality=60)
f = open(
    '../frontend/src/assets/staff_pictures/staff_picturesFA22/file_names.txt',
    'w+')
for names in file_names:
    f.write(names + '\n')
f.close()
