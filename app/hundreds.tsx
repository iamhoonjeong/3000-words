import { StyleSheet, ScrollView, Pressable, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

const cards = new Array(20).fill(0).map((value, index) => (index + 1) * 5);

export default function Hundreds() {
  const { hundred: headerTitle } = useLocalSearchParams<{ hundred?: string }>();
  const colorScheme = useColorScheme();

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
              {headerTitle}
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
          {cards.map((value, index) => (
            <View
              key={index}
              style={colorScheme === 'dark' ? styles.cardViewDarkTheme : styles.cardViewLightTheme}
            >
              <Pressable
                style={styles.cardContainer}
                onPress={() => router.push(`/words?hundred=${headerTitle}&word=${value}`)}
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
                <Pressable onPress={() => alert('Click Done')}>
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
  },

  cardViewLightTheme: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 60,
    marginBottom: 12,
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
