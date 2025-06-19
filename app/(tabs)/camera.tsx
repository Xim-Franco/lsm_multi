import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [letraReconocida, setLetraReconocida] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back); // Usamos CameraType directamente

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLetraReconocida('A');
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Permiso de cámara denegado</Text>
        <Button
          title="Solicitar de nuevo"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Captura de imagen</Text>
      <Camera
        style={styles.camera}
        type={type} // ← aquí está el cambio importante
        ref={cameraRef}
      />
      <View style={styles.info}>
        <Text style={styles.text}>
          Letra reconocida: {letraReconocida ?? ''}
        </Text>
        {letraReconocida === null && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  camera: {
    width: '100%',
    height: 500,
  },
  info: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});














