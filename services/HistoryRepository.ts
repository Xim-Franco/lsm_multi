// services/HistoryRepository.ts

let historyList: string[] = [];

const HistoryRepository = {
  getHistory: (): string[] => {
    return historyList;
  },
  addItem: (item: string) => {
    historyList.push(item);
  },
  clearHistory: () => {
    historyList = [];
  },
  setHistory: (newList: string[]) => {
    historyList = [...newList];
  },
};

export default HistoryRepository;
