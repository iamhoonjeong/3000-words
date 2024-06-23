import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

import { wordList } from '@/constants/Words';

export default function Hundreds() {
  const { hundred: headerTitle, word: headerTitleWord } = useLocalSearchParams<{
    hundred?: string;
    word?: string;
  }>();
  const colorScheme = useColorScheme();
  const cardContainerTheme =
    colorScheme === 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme;

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
          {wordList
            .slice(Number(headerTitleWord) - 5, Number(headerTitleWord) - 5 + 5)
            .map((value, index) => (
              <Pressable key={index} style={cardContainerTheme}>
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
                        <Pressable onPress={() => alert('Saved')}>
                          <Image
                            style={styles.cardIcon}
                            source={require('../assets/images/icons/saved-white.png')}
                          />
                        </Pressable>
                        <Pressable onPress={() => alert('Fold')}>
                          <Image
                            style={styles.cardIcon}
                            source={require('../assets/images/icons/arrow-down-white.png')}
                          />
                        </Pressable>
                      </View>
                    ) : (
                      <View style={styles.cardTitleIconContainerLightTheme}>
                        <Pressable onPress={() => alert('Saved')}>
                          <Image
                            style={styles.cardIcon}
                            source={require('../assets/images/icons/saved-black.png')}
                          />
                        </Pressable>
                        <Pressable onPress={() => alert('Fold')}>
                          <Image
                            style={styles.cardIcon}
                            source={require('../assets/images/icons/arrow-down-black.png')}
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
    marginRight: 8,
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

  cardTitleContainerDarkTheme: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 12,
  },

  cardTitleContainerLightTheme: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
  },

  cardTitleDarkTheme: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 24,
    fontFamily: 'MontserratBold',
  },

  cardTitleLightTheme: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 24,
    fontFamily: 'MontserratBold',
  },

  cardTitleIconContainerDarkTheme: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
  },

  cardTitleIconContainerLightTheme: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
  },

  cardIcon: {
    width: 36,
    height: 36,
    marginLeft: 8,
  },

  cardContentsContainerDarkTheme: {
    backgroundColor: '#fff',
    height: 260,
    padding: 12,
  },

  cardContentsContainerLightTheme: {
    backgroundColor: '#000',
    height: 260,
    padding: 12,
  },

  cardContentsDarkTheme: {
    color: '#000',
  },

  cardContentsLightTheme: {
    color: '#fff',
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
