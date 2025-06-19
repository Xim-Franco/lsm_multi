// app/(tabs)/history.tsx

import HistoryRepository from '@/services/HistoryRepository'; // lógica de datos
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const history = HistoryRepository.getHistory();
    setItems(history);
  }, []);

  const removeLastItem = () => {
    const updated = [...items];
    updated.pop();
    setItems(updated);
    HistoryRepository.setHistory(updated);
  };

  const clearAll = () => {
    setItems([]);
    HistoryRepository.clearHistory();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial</Text>

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.item}>{item}</Text>
            <View style={styles.divider} />
          </View>
        )}
      />

      <View style={styles.actions}>
        <Button title="Borrar todo" onPress={clearAll} />
      </View>

      <TouchableOpacity style={styles.fab} onPress={removeLastItem}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginBottom: 80,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  actions: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#2196f3',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

