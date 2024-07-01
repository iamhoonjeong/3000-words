import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useEffect, useCallback, useState } from 'react';

import { useInitStoreWordsList } from '@/components/useInitStoreWordsList';
import { useGetStoreWordList } from '@/components/useGetStoreWordList';
import { useModifyWordList } from '@/components/useModifyWordList';

export default function Home() {
  const colorScheme = useColorScheme();

  const [state, setState] = useState<any>();
  const [doneState, setDoneState] = useState<any>();

  useEffect(() => {
    const fetchInitialWords = async () => {
      try {
        await useInitStoreWordsList();
        const gotWordList = await useGetStoreWordList();

        if (gotWordList) {
          setState(gotWordList.slice(0, gotWordList.length));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialWords();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const gotWordList = await useGetStoreWordList();

          if (gotWordList) {
            setState(gotWordList.slice(0, gotWordList.length));
          }
        } catch (error) {
          console.error(error);
        }
      })();
      return () => {
        console.log('Focus Out Index Page');
      };
    }, []),
  );

  useEffect(() => {
    if (state) {
      let doneStateArray: any = [];

      for (let i = 0; i < state.length / 100; i++) {
        let divideOfThirty = state.slice(i * 100, i * 100 + 100);
        let check = divideOfThirty.filter((e: any) => e.done);

        if (check.length === 100) {
          doneStateArray.push({ done: true });
        } else {
          doneStateArray.push({ done: false });
        }
      }

      setDoneState(doneStateArray);
    }
  }, [state]);

  const onDoneTouch = async (index: number) => {
    try {
      const modifyWordList = await useGetStoreWordList();
      const wordIndex = index * 100;

      let changeWord;

      if (!doneState[index].done) {
        changeWord = modifyWordList.splice(wordIndex, 100).map((value: any) => {
          return { ...value, done: true };
        });
      } else {
        changeWord = modifyWordList.splice(wordIndex, 100).map((value: any) => {
          return { ...value, done: false };
        });
      }

      modifyWordList.splice(wordIndex, 0, ...changeWord);
      await useModifyWordList(modifyWordList);
    } catch (error) {
      console.error(error);
    }

    setDoneState(
      doneState.map((value: any, arrayIndex: any) => {
        if (index === arrayIndex) {
          return { ...value, done: !value.done };
        } else {
          return { ...value };
        }
      }),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text
              style={
                colorScheme === 'dark' ? styles.headerTitleDarkTheme : styles.headerTitleLightTheme
              }
            >
              Words
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            {colorScheme === 'dark' ? (
              <Pressable onPress={() => router.push('/saved')}>
                <Image
                  style={styles.headerSavedIcon}
                  source={require('../assets/images/icons/saved-white.png')}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push('/saved')}>
                <Image
                  style={styles.headerSavedIcon}
                  source={require('../assets/images/icons/saved-black.png')}
                />
              </Pressable>
            )}
          </View>
        </View>

        {/* Cards */}
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {doneState &&
            doneState.map((value: any, index: any) => (
              <View
                key={index}
                style={
                  colorScheme !== 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme
                }
              >
                <Pressable
                  style={styles.cardContainer}
                  onPress={() => router.push(`/hundreds?hundred=${index * 100 + 100}`)}
                >
                  <View>
                    <Text
                      style={
                        colorScheme !== 'dark'
                          ? styles.cardTitleDarkTheme
                          : styles.cardTitleLightTheme
                      }
                    >
                      {index * 100 + 100}
                    </Text>
                  </View>
                  <Pressable onPress={() => onDoneTouch(index)}>
                    <View>
                      {colorScheme !== 'dark' ? (
                        value.done ? (
                          <Image
                            style={styles.cardDoneIcon}
                            source={require('../assets/images/icons/done-complete-white.png')}
                          />
                        ) : (
                          <Image
                            style={styles.cardDoneIcon}
                            source={require('../assets/images/icons/done-white.png')}
                          />
                        )
                      ) : value.done ? (
                        <Image
                          style={styles.cardDoneIcon}
                          source={require('../assets/images/icons/done-complete-black.png')}
                        />
                      ) : (
                        <Image
                          style={styles.cardDoneIcon}
                          source={require('../assets/images/icons/done-black.png')}
                        />
                      )}
                    </View>
                  </Pressable>
                </Pressable>
              </View>
            ))}
        </ScrollView>

        {/* Advertizement */}
        {/* <View style={styles.AdvertizementContainer}>
          <Text style={styles.AdvertizementText}>Advertising</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  headerTitleDarkTheme: {
    fontSize: 36,
    fontFamily: 'MontserratAlternatesBlack',
    color: '#fff',
  },

  headerTitleLightTheme: {
    fontSize: 36,
    fontFamily: 'MontserratAlternatesBlack',
    color: '#000',
  },

  headerIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerSavedIcon: {
    width: 36,
    height: 36,
  },

  scrollView: {
    marginTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
  },

  cardViewDarkTheme: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
    backgroundColor: '#000',
  },

  cardViewLightTheme: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  cardContainer: {
    height: '100%',
    padding: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitleDarkTheme: {
    fontSize: 26,
    fontFamily: 'MontserratAlternatesBlack',
    color: '#fff',
  },

  cardTitleLightTheme: {
    fontSize: 26,
    fontFamily: 'MontserratAlternatesBlack',
    color: '#000',
  },

  cardDoneIcon: {
    width: 36,
    height: 36,
    marginLeft: 12,
  },

  AdvertizementContainer: {
    backgroundColor: 'green',
    height: 50,
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  AdvertizementText: {
    fontFamily: 'MontserratAlternatesBlack',
  },
});
