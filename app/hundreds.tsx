import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

import { useCallback, useEffect, useState } from 'react';

import { useGetStoreWordList } from '@/components/useGetStoreWordList';
import { useModifyWordList } from '@/components/useModifyWordList';

export default function Hundreds() {
  const { hundred: headerTitle } = useLocalSearchParams<{ hundred?: string }>();
  const colorScheme = useColorScheme();

  const [state, setState] = useState<any>();
  const [doneState, setDoneState] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const gotWordList = await useGetStoreWordList();

          if (headerTitle) setState(gotWordList.slice(Number(headerTitle) - 100, Number(headerTitle)));
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

      for (let i = 0; i < state.length / 5; i++) {
        let divideOfFive = state.slice(i * 5, i * 5 + 5);
        let check = divideOfFive.filter((e: any) => e.done);

        if (check.length === 5) {
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
      const wordIndex = Number(headerTitle) - 100 + index;

      let changeWord = modifyWordList.splice(wordIndex, 5).map((value: any) => {
        return { ...value, done: !value.done };
      });

      modifyWordList.splice(wordIndex, 0, ...changeWord);
      await useModifyWordList(modifyWordList);
    } catch (error) {
      console.error(error);
    }

    setDoneState(
      doneState.map((value: any, arrayIndex: any) => {
        if (index / 5 === arrayIndex) {
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
          <View style={styles.headerTitleContainer}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              {colorScheme === 'dark' ? (
                <Image style={styles.headerBackIcon} source={require('../assets/images/icons/arrow-left-white.png')} />
              ) : (
                <Image style={styles.headerBackIcon} source={require('../assets/images/icons/arrow-left-black.png')} />
              )}
            </Pressable>
            <Text style={colorScheme === 'dark' ? styles.headerTitleDarkTheme : styles.headerTitleLightTheme}>{headerTitle}</Text>
          </View>
          <View style={styles.headerIconContainer}>
            {colorScheme === 'dark' ? (
              <>
                <Pressable onPress={() => router.push('/saved')}>
                  <Image style={styles.headerIcon} source={require('../assets/images/icons/saved-white.png')} />
                </Pressable>
                <Pressable onPress={() => router.push(`/game?hundred=${headerTitle}`)}>
                  <Image style={styles.headerIcon} source={require('../assets/images/icons/game-white.png')} />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => router.push('/saved')}>
                  <Image style={styles.headerIcon} source={require('../assets/images/icons/saved-black.png')} />
                </Pressable>
                <Pressable onPress={() => router.push(`/game?hundred=${headerTitle}`)}>
                  <Image style={styles.headerIcon} source={require('../assets/images/icons/game-black.png')} />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* Cards */}
        <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {doneState &&
            doneState.map((value: any, index: any) => (
              <View key={index} style={colorScheme !== 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme}>
                <Pressable style={styles.cardContainer} onPress={() => router.push(`/words?hundred=${headerTitle}&word=${index * 5 + 5}`)}>
                  <View>
                    <Text style={colorScheme !== 'dark' ? styles.cardTitleDarkTheme : styles.cardTitleLightTheme}>{index * 5 + 5}</Text>
                  </View>
                  <Pressable onPress={() => onDoneTouch(index * 5)}>
                    <View>
                      {colorScheme !== 'dark' ? (
                        value.done ? (
                          <Image style={styles.cardDoneIcon} source={require('../assets/images/icons/done-complete-white.png')} />
                        ) : (
                          <Image style={styles.cardDoneIcon} source={require('../assets/images/icons/done-white.png')} />
                        )
                      ) : value.done ? (
                        <Image style={styles.cardDoneIcon} source={require('../assets/images/icons/done-complete-black.png')} />
                      ) : (
                        <Image style={styles.cardDoneIcon} source={require('../assets/images/icons/done-black.png')} />
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

  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerBackIcon: {
    width: 36,
    height: 36,
    marginRight: 2,
    marginLeft: -10,
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

  headerIcon: {
    width: 36,
    height: 36,
    marginLeft: 8,
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
    height: 60,
    marginBottom: 12,
    backgroundColor: '#000',
  },

  cardViewLightTheme: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 60,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  cardContainer: {
    height: '100%',
    paddingLeft: 26,
    paddingRight: 26,
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
