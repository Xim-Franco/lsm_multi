import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Captura de imagen</Text>

      <View style={styles.card}>
        {/* vista de la cámara */}
        <Image
          source={require('@/assets/images/app.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.result}>Letra reconocida: A</Text>

      {/* FAB como botón de captura */}
      <TouchableOpacity style={styles.captureButton} onPress={() => console.log('Capturar imagen')} />
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
  image: {
    width: '100%',
    height: '100%',
  },
  result: {
    marginTop: 24,
    marginBottom: 80, // deja espacio para el FAB
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
  },
  captureButton: {
    position: 'absolute',
    bottom: 10, // separación del borde inferior
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#bbb',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },  
});




















