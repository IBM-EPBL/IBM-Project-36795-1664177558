import os
import numpy as np
from keras.models import load_model
from keras.preprocessing import image
import tensorflow as tf
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from keras.models import model_from_json
from PIL import Image

app = Flask(__name__)

json_file = open('final_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights("final_model.h5")

# loaded_model=load_model('uploads/final_model.h5')
@app.route('/')
def index():
    return render_template("home.html")

@app.route('/login')
def index1():
    return render_template("login.html")

@app.route('/register')
def index2():
    return render_template("register.html")

@app.route('/upload')
def index3():
    return render_template("upload.html")

@app.route('/predict', methods=['GET', 'POST'])
def Upload():
    if request.method == 'POST':
        f = request.files['image']
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, '', secure_filename(f.filename))
        f.save(file_path)
        img = image.load_img(file_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        pred = np.argmax(loaded_model.predict(x), axis=-1)
        op = ['Great Indian Bustard Bird', 'Spoon Billed Sandpiper Bird', 'Corpse Flower', 'Lady Slipper Orchid Flower',
              'Pangolin Mammal', 'Senenca White Deer Mammal']
        text = op[pred[0]]
        return render_template('upload.html',value=text)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8000,debug=True)