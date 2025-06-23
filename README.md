# Manos Inteligentes: App Móvil para el reconocimiento de la Lengua de Señas Mexicana (LSM)

## Integrantes

- Ximena Yahel Juárez Franco  
- Mario Cordova Calva  
- Roberto Ángel Zamora Ramos  

## Descripción

Este proyecto implementa una aplicación móvil multiplataforma desarrollada en React Native, enfocada en el reconocimiento del alfabeto dactilológico de la Lengua de Señas Mexicana (LSM).  

La aplicación integra un modelo de redes neuronales profundas, el cual fue entrenado y desplegado mediante TensorFlow Lite. A diferencia de versiones anteriores, se implementa una API externa que recibe imágenes capturadas por la cámara del dispositivo, las preprocesa y las manda al modelo, el cual devuelve la letra reconocida, optimizando así el rendimiento y compatibilidad entre plataformas Android e iOS.

## Funcionalidades

- Captura de señas en tiempo real usando `expo-camera`.
- Consumo de servicios a través de una API REST desarrollada con FastAPI.
- Reconocimiento de 27 letras del alfabeto LSM con un modelo `.tflite`.
- Interfaz fluida e intuitiva con navegación por pestañas usando `@react-navigation/bottom-tabs`.
- Historial de letras reconocidas almacenado localmente.
- Diseño responsivo siguiendo principios de UX/UI.
- Manejo de errores y permisos de cámara para estabilidad y seguridad.

## Requisitos

- Node.js >= 18  
- Expo CLI (`npm install -g expo-cli`)  
- Dispositivo físico o emulador con cámara  
- Acceso a red local (para consumir la API)  
- Backend con API activa (FastAPI) y modelo `lenguajeSenas.tflite` cargado

## Para ejecutar la app

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/Xim-Franco/lsm_multi.git
2. Instala las dependencias: npm install
3. Inicia el proyecto con Expo: npx expo start
4. Abre la app en un emulador o dispositivo físico usando la app de Expo Go.
5. Concede permisos de cámara al iniciar la aplicación.
6. El servidor FastAPI debe estar corriendo en la misma red local.

