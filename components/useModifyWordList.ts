import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGetStoreWordList } from '@/components/useGetStoreWordList';

export async function useModifyWordList(list: any) {
  let storeWordList: any;

  try {
    await AsyncStorage.removeItem('storeWordList');
    await AsyncStorage.setItem('storeWordList', JSON.stringify(list));
  } catch (error) {
    alert(error);
  }
}
