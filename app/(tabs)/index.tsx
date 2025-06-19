// app/(tabs)/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCamera = () => {
    router.push('/camera');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')} // asegúrate de tener el logo en esa ruta
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={navigateToCamera}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 290,
    height: 290,
    marginBottom: 100,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

