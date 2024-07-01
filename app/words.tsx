import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

import { useState, useCallback } from 'react';

import { useGetStoreWordList } from '@/components/useGetStoreWordList';
import { useModifyWordList } from '@/components/useModifyWordList';

export default function Hundreds() {
  const { hundred: headerTitle, word: headerTitleWord } = useLocalSearchParams<{
    hundred?: string;
    word?: string;
  }>();
  const colorScheme = useColorScheme();
  const cardContainerTheme =
    colorScheme === 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme;
  const cardContainerFoldTheme =
    colorScheme === 'dark' ? styles.cardViewFoldDarkTheme : styles.cardViewFoldLightTheme;

  const [state, setState] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const startIndex = Number(headerTitle) - 100 + Number(headerTitleWord) - 5;
          const modifyWordList = await useGetStoreWordList();
          const selectedWords = modifyWordList.slice(startIndex, startIndex + 5);

          setState(
            selectedWords.map((value: any) => {
              return { ...value, fold: false };
            }),
          );
        } catch (error) {
          console.error(error);
        }
      })();
      return () => {
        console.log('Focus Out Index Page');
      };
    }, []),
  );

  const onSavedTouch = async (word: string, index: number) => {
    try {
      const modifyWordList = await useGetStoreWordList();
      const wordIndex = modifyWordList.findIndex((value: any) => value.word === word);

      let changeWord = modifyWordList.splice(wordIndex, 1)[0];
      changeWord.saved = !changeWord.saved;

      modifyWordList.splice(wordIndex, 0, changeWord);
      await useModifyWordList(modifyWordList);
    } catch (error) {
      console.error(error);
    }

    setState(
      state.map((value: any, arrayIndex: any) =>
        arrayIndex === index ? { ...value, saved: !value.saved } : { ...value },
      ),
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
                <Image
                  style={styles.headerBackIcon}
                  source={require('../assets/images/icons/arrow-left-white.png')}
                />
              ) : (
                <Image
                  style={styles.headerBackIcon}
                  source={require('../assets/images/icons/arrow-left-black.png')}
                />
              )}
            </Pressable>
            <Text
              style={
                colorScheme === 'dark' ? styles.headerTitleDarkTheme : styles.headerTitleLightTheme
              }
            >
              {headerTitle} - {headerTitleWord}
            </Text>
          </View>
          <View style={styles.headerIconContainer}>
            {colorScheme === 'dark' ? (
              <>
                <Pressable onPress={() => router.push('/saved')}>
                  <Image
                    style={styles.headerIcon}
                    source={require('../assets/images/icons/saved-white.png')}
                  />
                </Pressable>
                <Pressable onPress={() => router.push('/game')}>
                  <Image
                    style={styles.headerIcon}
                    source={require('../assets/images/icons/game-white.png')}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => router.push('/saved')}>
                  <Image
                    style={styles.headerIcon}
                    source={require('../assets/images/icons/saved-black.png')}
                  />
                </Pressable>
                <Pressable onPress={() => router.push('/game')}>
                  <Image
                    style={styles.headerIcon}
                    source={require('../assets/images/icons/game-black.png')}
                  />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* Cards */}
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {state &&
            state.map((value: any, index: any) => (
              <Pressable
                key={index}
                style={value.fold ? cardContainerFoldTheme : cardContainerTheme}
              >
                <View
                  style={
                    colorScheme === 'dark'
                      ? styles.cardTitleContainerDarkTheme
                      : styles.cardTitleContainerLightTheme
                  }
                >
                  <View>
                    <Text
                      style={
                        colorScheme === 'dark'
                          ? styles.cardTitleDarkTheme
                          : styles.cardTitleLightTheme
                      }
                    >
                      {value.word}
                    </Text>
                  </View>
                  <View>
                    {colorScheme === 'dark' ? (
                      <View style={styles.cardTitleIconContainerDarkTheme}>
                        <Pressable onPress={() => onSavedTouch(value.word, index)}>
                          {value.saved ? (
                            <Image
                              style={styles.cardIcon}
                              source={require('../assets/images/icons/saved-complete-black.png')}
                            />
                          ) : (
                            <Image
                              style={styles.cardIcon}
                              source={require('../assets/images/icons/saved-black.png')}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setState(
                              state.map((value: any, arrayIndex: any) =>
                                arrayIndex === index
                                  ? { ...value, fold: !value.fold }
                                  : { ...value },
                              ),
                            );
                          }}
                        >
                          <Image
                            style={value.fold ? styles.cardFoldIcon : styles.cardIcon}
                            source={require('../assets/images/icons/arrow-down-black.png')}
                          />
                        </Pressable>
                      </View>
                    ) : (
                      <View style={styles.cardTitleIconContainerLightTheme}>
                        <Pressable onPress={() => onSavedTouch(value.word, index)}>
                          {value.saved ? (
                            <Image
                              style={styles.cardIcon}
                              source={require('../assets/images/icons/saved-complete-white.png')}
                            />
                          ) : (
                            <Image
                              style={styles.cardIcon}
                              source={require('../assets/images/icons/saved-white.png')}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setState(
                              state.map((value: any, arrayIndex: any) =>
                                arrayIndex === index
                                  ? { ...value, fold: !value.fold }
                                  : { ...value },
                              ),
                            );
                          }}
                        >
                          <Image
                            style={value.fold ? styles.cardFoldIcon : styles.cardIcon}
                            source={require('../assets/images/icons/arrow-down-white.png')}
                          />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>

                {/* Card Contents */}
                <View
                  style={
                    colorScheme === 'dark'
                      ? styles.cardContentsContainerDarkTheme
                      : styles.cardContentsContainerLightTheme
                  }
                >
                  <Text
                    style={
                      colorScheme === 'dark'
                        ? styles.cardContentsDarkTheme
                        : styles.cardContentsLightTheme
                    }
                  >
                    1. She had to “drag” the heavy suitcase up the stairs.
                  </Text>
                </View>
              </Pressable>
            ))}
        </ScrollView>

        {/* Advertizement */}
        <View style={styles.AdvertizementContainer}>
          <Text style={styles.AdvertizementText}>Advertising</Text>
        </View>
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },

  cardViewLightTheme: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },

  cardViewFoldDarkTheme: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    height: 60,
  },

  cardViewFoldLightTheme: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    height: 60,
  },

  cardTitleContainerDarkTheme: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
  },

  cardTitleContainerLightTheme: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 12,
  },

  cardTitleDarkTheme: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 24,
    fontFamily: 'MontserratBold',
  },

  cardTitleLightTheme: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 24,
    fontFamily: 'MontserratBold',
  },

  cardTitleIconContainerDarkTheme: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
  },

  cardTitleIconContainerLightTheme: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
  },

  cardIcon: {
    width: 36,
    height: 36,
    marginLeft: 8,
  },

  cardFoldIcon: {
    width: 36,
    height: 36,
    marginLeft: 8,
    transform: [{ rotate: '180deg' }],
  },

  cardContentsContainerDarkTheme: {
    backgroundColor: '#000',
    height: 260,
    padding: 12,
  },

  cardContentsContainerLightTheme: {
    backgroundColor: '#fff',
    height: 260,
    padding: 12,
  },

  cardContentsDarkTheme: {
    color: '#fff',
  },

  cardContentsLightTheme: {
    color: '#000',
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
