import {
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

export default function Game() {
  const colorScheme = useColorScheme();
  const word = 'independence';

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
              Game
            </Text>
          </View>
        </View>

        {/* Game Contents */}
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.wordIndicatorContainer}>
            <Text
              style={
                colorScheme === 'dark'
                  ? styles.wordIndicatorDarkTheme
                  : styles.wordIndicatorLightTheme
              }
            >
              independence
            </Text>
          </View>

          <View style={styles.textInputContainer}>
            {word.split('').map((value, index) => (
              <TextInput
                placeholder={`${value.toUpperCase()}`}
                key={index}
                style={[
                  colorScheme === 'dark' ? styles.textInputDarkTheme : styles.textInputLightTheme,
                  styles.textInput,
                  {
                    width: (Dimensions.get('window').width - 40) / 5 - 4,
                    height: (Dimensions.get('window').width - 40) / 5 - 4,
                  },
                ]}
              />
            ))}
          </View>
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

  scrollView: {
    marginTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
  },

  wordIndicatorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },

  wordIndicatorDarkTheme: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#fff',
  },

  wordIndicatorLightTheme: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#000',
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    width: '100%',
  },

  textInput: {
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    fontSize: 26,
    fontFamily: 'MontserratBold',
  },

  textInputDarkTheme: {
    borderColor: '#fff',
    color: '#fff',
  },

  textInputLightTheme: {
    borderColor: '#000',
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
