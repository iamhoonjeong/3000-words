import AsyncStorage from '@react-native-async-storage/async-storage';

export async function useGetStoreWordList() {
  let storeWordList: any;

  try {
    storeWordList = await AsyncStorage.getItem('storeWordList');
  } catch (error) {
    alert(error);
  }

  return JSON.parse(storeWordList);
}
