import numpy as np
import tensorflow as tf
from PIL import Image
import cv2
import numpy as np
import matplotlib.pyplot as plt

def load_model(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

def preprocess_image(image: Image.Image):
    
    print("🔧 Procesando imagen...")

    # Redimensionar más grande antes de binarizar (por calidad)
    image = image.resize((200, 200))

    # Convertir a arreglo y binarizar
    img_array = np.array(image).astype("uint8")

    # Aplicar umbral adaptativo o de Otsu
    _, thresh = cv2.threshold(img_array, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    if np.mean(thresh) > 127:
        thresh = 255 - thresh

    # Redimensionar a 40x40 para el modelo
    resized = cv2.resize(thresh, (40, 40), interpolation=cv2.INTER_AREA)

    plt.imshow(resized, cmap="gray")
    plt.title("Entrada al modelo (40x40)")
    plt.axis("off")
    plt.show()

    
    input_array = resized.astype("float32") / 255.0
    input_array = input_array.reshape(1, 40, 40, 1)

    return input_array

def predict_from_image(interpreter, image: Image.Image):
    input_data = preprocess_image(image)
    print(input_data)
    input_index = interpreter.get_input_details()[0]['index']
    output_index = interpreter.get_output_details()[0]['index']
    
    interpreter.set_tensor(input_index, input_data)
    interpreter.invoke()
    
    output = interpreter.get_tensor(output_index)
    predicted_class = int(np.argmax(output)) 
    return predicted_class
