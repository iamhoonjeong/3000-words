import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useEffect, useCallback } from 'react';

import { useInitStoreWordsList } from '@/components/useInitStoreWordsList';

const cards = new Array(30).fill(0).map((value, index) => (index + 1) * 100);

export default function Home() {
  const colorScheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      console.log('Focus Index Page');
      return () => {
        console.log('Focus Out Index Page');
      };
    }, []),
  );

  useEffect(() => {
    useInitStoreWordsList();
  }, []);

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
          {cards.map((value, index) => (
            <View
              key={index}
              style={colorScheme === 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme}
            >
              <Pressable
                style={styles.cardContainer}
                onPress={() => router.push(`/hundreds?hundred=${value}`)}
              >
                <View>
                  <Text
                    style={
                      colorScheme === 'dark'
                        ? styles.cardTitleDarkTheme
                        : styles.cardTitleLightTheme
                    }
                  >
                    {value}
                  </Text>
                </View>
                <Pressable onPress={() => alert('Click done')}>
                  <View>
                    {colorScheme === 'dark' ? (
                      <Image
                        style={styles.cardDoneIcon}
                        source={require('../assets/images/icons/done-white.png')}
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
  },

  cardViewLightTheme: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
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
