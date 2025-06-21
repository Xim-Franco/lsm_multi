import { LinearGradient } from 'expo-linear-gradient'; // Pa fondo con degradado
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const router = useRouter(); // Hook para manejar navegación

  // navega a la pantalla de la cámara
  const navigateToCamera = () => {
    router.push('/camera');
  };

  return (
    <LinearGradient
      colors={['#2874a6', '#aed6f1', '#ffffff']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={navigateToCamera}>
        <Text style={styles.buttonText}>INICIO</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 80,
  },
  button: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#1f618d',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});





