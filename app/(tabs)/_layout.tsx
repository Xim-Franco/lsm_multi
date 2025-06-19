// app/(tabs)/_layout.tsx

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'camera') {
            iconName = 'camera';
          } else if (route.name === 'history') {
            iconName = 'time'; // equivalente al ícono de historial
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2980b9',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="camera" options={{ title: 'Cámara' }} />
      <Tabs.Screen name="history" options={{ title: 'Historial' }} />
    </Tabs>
  );
}

