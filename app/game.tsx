import { StyleSheet, ScrollView, Pressable, Image, Text, View, TextInput, Dimensions, TextInputSubmitEditingEventData, NativeEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react';

import { useGetStoreWordList } from '@/components/useGetStoreWordList';

export default function Game() {
  const { hundred: headerTitle, word: headerTitleWord } = useLocalSearchParams<{
    hundred?: string;
    word?: string;
  }>();
  const [state, setState] = useState<any>(null);
  const [indicator, setIndicator] = useState<any>(null);

  const colorScheme = useColorScheme();
  const inputRef = useRef<any>(null);
  const delay = 500;

  useEffect(() => {
    if (state) {
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus();
        }, delay);
      }
    }
  }, [state]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          let startIndex;
          let modifyWordList;
          let selectedWords;

          if (headerTitle && headerTitleWord) {
            startIndex = Number(headerTitle) - 100 + Number(headerTitleWord) - 5;
            modifyWordList = await useGetStoreWordList();
            selectedWords = modifyWordList.slice(startIndex, startIndex + 5);
          } else if (headerTitle && !headerTitleWord) {
            startIndex = Number(headerTitle);
            modifyWordList = await useGetStoreWordList();
            selectedWords = modifyWordList.slice(startIndex - 100, startIndex);
          } else if (!headerTitle && !headerTitleWord) {
            console.log('saved');
            modifyWordList = await useGetStoreWordList();
            selectedWords = modifyWordList.filter((value: any) => value.saved);
          }

          setState(
            selectedWords.map((value: any) => {
              return { ...value };
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
            <Text style={colorScheme === 'dark' ? styles.headerTitleDarkTheme : styles.headerTitleLightTheme}>Game</Text>
          </View>
        </View>

        {/* Game Contents */}
        {state ? (
          <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {/* Left */}
            <View style={styles.wordMeaningContainer}>
              <Text style={colorScheme === 'dark' ? styles.wordMeaningTitleDarkTheme : styles.wordMeaningTitleLightTheme}>Left</Text>
              <Text style={colorScheme === 'dark' ? styles.wordMeaningDarkTheme : styles.wordMeaningLightTheme}>{state.length}</Text>
            </View>

            {/* Meaning */}
            <View style={styles.wordMeaningContainer}>
              <Text style={colorScheme === 'dark' ? styles.wordMeaningTitleDarkTheme : styles.wordMeaningTitleLightTheme}>Meaning</Text>
              <Text style={colorScheme === 'dark' ? styles.wordMeaningDarkTheme : styles.wordMeaningLightTheme}>{state[0].meaning_kor}</Text>
            </View>

            <Text style={colorScheme === 'dark' ? styles.wordInputTitleDarkTheme : styles.wordInputTitleLightTheme}>Word</Text>

            {/* Text Input */}
            <View style={colorScheme === 'dark' ? styles.wordInputContainerDarkTheme : styles.wordInputContainerLightTheme}>
              <TextInput
                ref={inputRef}
                maxLength={state[0].word.split('').length}
                autoFocus={false}
                autoCapitalize="none"
                placeholder={`. . . ${state[0].word.split('').length} Character & ${state[0].word}`}
                style={colorScheme === 'dark' ? styles.wordInputDarkTheme : styles.wordInputLightTheme}
                onSubmitEditing={(e: any) => {
                  if (state.length === 1) {
                    setTimeout(() => {
                      router.back();
                    }, delay);
                  } else {
                    if (e.nativeEvent.text.toLowerCase() === state[0].word) {
                      setState(state.slice(1, state.length));
                    }
                    e.target.clear();
                  }
                }}
              />
            </View>

            {/* Indicator */}
            <View style={styles.textIndicatorContainer}>
              {state[0].word.split('').map((value: any, index: any) => (
                <View
                  key={index}
                  style={[
                    colorScheme === 'dark' ? styles.wordIndicatorContainerDarkTheme : styles.wordIndicatorContainerLightTheme,
                    {
                      width: (Dimensions.get('window').width - 40) / 5 - 3,
                      height: (Dimensions.get('window').width - 40) / 5 - 3,
                    },
                  ]}
                >
                  <Text style={colorScheme === 'dark' ? styles.wordIndicatorContainerCharacterDarkTheme : styles.wordIndicatorContainerCharacterLightTheme}>
                    {index + 1}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.hintButtonContainer}>
              <Pressable style={styles.hintButton}>
                <Text style={{ fontSize: 36 }}>😃</Text>
              </Pressable>
              <Pressable style={styles.hintButton}>
                <Text style={{ fontSize: 36 }}>🥹</Text>
              </Pressable>
              <Pressable style={styles.hintButton}>
                <Text style={{ fontSize: 36 }}>🥰</Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <></>
        )}

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

  scrollView: {
    marginTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
  },

  wordMeaningContainer: {
    display: 'flex',
    marginBottom: 24,
  },

  wordMeaningTitleDarkTheme: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    color: '#fff',
    marginBottom: 12,
  },

  wordMeaningTitleLightTheme: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    color: '#000',
    marginBottom: 12,
  },

  wordMeaningDarkTheme: {
    fontSize: 16,
    fontFamily: 'MontserratLight',
    color: '#fff',
  },

  wordMeaningLightTheme: {
    fontSize: 16,
    fontFamily: 'MontserratLight',
    color: '#000',
  },

  wordInputContainerDarkTheme: {
    display: 'flex',
    marginTop: 16,
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },

  wordInputContainerLightTheme: {
    display: 'flex',
    marginTop: 16,
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
  },

  wordInputDarkTheme: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },

  wordInputLightTheme: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#000',
  },

  wordInputTitleDarkTheme: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },

  wordInputTitleLightTheme: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    color: '#000',
  },

  textIndicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    width: '100%',
    gap: 3,
  },

  wordIndicatorContainerDarkTheme: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  wordIndicatorContainerLightTheme: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },

  wordIndicatorContainerCharacterDarkTheme: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'MontserratBold',
  },

  wordIndicatorContainerCharacterLightTheme: {
    color: '#000',
    fontSize: 26,
    fontFamily: 'MontserratBold',
  },

  hintButtonContainer: {
    marginTop: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  hintButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
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
