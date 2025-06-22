import { Ionicons } from '@expo/vector-icons'; // Importa los íconos
import { Tabs } from 'expo-router'; // expo-router = navegación entre pantallas

// Componente principal define la estructura de las pantallas
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => { // ícono que se mostrará en la barra
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          // Asigna un ícono diferente dependiendo del nombre de la ruta
          if (route.name === 'index') {
            iconName = 'home'; 
          } else if (route.name === 'camera') {
            iconName = 'camera'; 
          } else if (route.name === 'history') {
            iconName = 'time';
          }

          // componente de ícono con el nombre, tamaño y color asignadi
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Color del ícono cuando la pantalla está activa
        tabBarActiveTintColor: '#2980b9',
        // Color del ícono cuando la pantalla está inactiva
        tabBarInactiveTintColor: 'gray',
        // Oculta el encabezado en la parte superior de cada pantalla
        headerShown: false,
      })}
    >
      {/* Define las pantallas */}
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="camera" options={{ title: 'Cámara' }} />
      <Tabs.Screen name="history" options={{ title: 'Historial' }} />
    </Tabs>
  );
}


