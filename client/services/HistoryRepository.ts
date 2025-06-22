import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "history_lsm";

const HistoryRepository = {
  async getHistory(): Promise<string[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Error al obtener historial:", error);
      return [];
    }
  },

  async setHistory(data: string[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error al guardar historial:", error);
    }
  },

  async addToHistory(item: string) {
    const current = await HistoryRepository.getHistory();
    current.push(item);
    await HistoryRepository.setHistory(current);
  },

  async clearHistory() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error al borrar historial:", error);
    }
  }
};

export default HistoryRepository;
