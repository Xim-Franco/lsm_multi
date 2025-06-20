import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); // <--- tipado flexible por compatibilidad

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Foto capturada:', photo.uri);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.loading}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }

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

      <Text style={styles.result}>Letra reconocida: A</Text>

      <TouchableOpacity style={styles.captureButton} onPress={captureImage} />
    </View>
  );
}

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























