import HistoryRepository from '@/services/HistoryRepository';
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
          <View style={styles.card}>
            <Text style={styles.item}>{item}</Text>
          </View>
        )}
      />

      <View style={styles.actions}>
        <Button title="Borrar todo" color="#c0392b" onPress={clearAll} />
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
    backgroundColor: '#f7f9fc',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2c3e50',
  },
  list: {
    flex: 1,
    marginBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  item: {
    fontSize: 18,
    color: '#34495e',
  },
  actions: {
    marginBottom: 16,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2980b9',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});

