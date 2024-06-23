import AsyncStorage from '@react-native-async-storage/async-storage';
import { wordList } from '@/constants/Words';

export async function useInitStoreWordsList() {
  let storeWordList;
  storeWordList = await AsyncStorage.getItem('storeWordList');

  if (storeWordList === null) {
    storeWordList = await AsyncStorage.setItem('storeWordList', JSON.stringify(wordList));
    try {
    } catch (error) {
      alert(error);
    }
  }
}
