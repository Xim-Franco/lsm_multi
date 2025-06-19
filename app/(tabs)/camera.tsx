import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla cámara funcionando</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f7f9fc',
  },
  text: {
    fontSize: 20,
    color: '#2c3e50',
  },
});

















