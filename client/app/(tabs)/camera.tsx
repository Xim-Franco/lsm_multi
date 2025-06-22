// módulos para usar la cámara y construir la interfaz
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HistoryRepository from '@/services/HistoryRepository';

const API_URL = "http://192.168.1.73:8000/predict";

export default function CameraScreen() {
  // Estado y función para los permisos de la cámara
  const [permission, requestPermission] = useCameraPermissions();
  const [letraReconocida, setLetraReconocida] = useState<string | null>(null);
  
  // referencia a la cámara para poder llamar métodos como takePictureAsync()
  const cameraRef = useRef<any>(null);
  
  // Solicita permisos
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Se ejecuta al presionar el botón de captura
  // toma la foto desde la cámara y muestra la URI en consola
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({base64: false});
      console.log('Foto capturada:', photo.uri);
      const letra = await enviarImagen(photo.uri);
      if (letra) {
        setLetraReconocida(letra);
        await HistoryRepository.addToHistory(letra);
      }
      setLetraReconocida(letra);
      console.log('Letra reconocida:', letra);
    }
  };

  const enviarImagen = async (uri: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "imagen.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const json = await response.json();
      const clase = json.prediction;

      const clasesLSM = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i",
        "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"
      ];

      const letra = clasesLSM[clase] ?? "?";
      return letra;
    } catch (error) {
      console.error("Error enviando imagen:", error);
      return null;
    }
  };
  
  // Si los permisos no están concedidos se muestra un mensaje de espera
  if (!permission?.granted) {
    return (
      <View style={styles.loading}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }

  // Renderiza la pantalla
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Captura de imagen</Text>

      <View style={styles.card}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={cameraRef}
        />
      </View>

      <Text style={styles.result}>Letra reconocida: {letraReconocida ?? "Ninguna"}</Text>

      <TouchableOpacity style={styles.captureButton} onPress={captureImage} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#d6eaf8',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6eaf8',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2c3e50',
  },
  card: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  result: {
    marginTop: 24,
    marginBottom: 80,
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
  },
  captureButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#2980b9',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});























