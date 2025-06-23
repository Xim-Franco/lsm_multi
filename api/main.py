from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils import load_model, predict_from_image
from PIL import Image, ImageOps
import io

app = FastAPI()

# Permitir acceso desde app móvil
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restringido
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar modelo TFLite nomás 1 vez
interpreter = load_model("model/lenguajeSenas.tflite")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    image = ImageOps.exif_transpose(image)   # Aplica orientación EXIF
    image = image.convert("L")  
    image.save("imagen_recibida.jpg")
    print("Imagen guardada como 'imagen_recibida.jpg'")
    prediction = predict_from_image(interpreter, image)
    return {"prediction": prediction}
