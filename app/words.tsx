import { StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useLocalSearchParams } from 'expo-router';
import { wordList } from '@/constants/Words';

const array = new Array(20).fill(0).map((array, index) => (index + 1) * 5);

export default function Hundreds() {
  const colorScheme = useColorScheme();
  const { hundred, word } = useLocalSearchParams<{ hundred?: string; word?: string }>();

  const themeListStyle = colorScheme === 'dark' ? styles.darkWordList : styles.lightWordList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                  source={require('../assets/images/arrow-left-white.png')}
                />
              ) : (
                <Image
                  style={styles.headerBackIcon}
                  source={require('../assets/images/arrow-left-black.png')}
                />
              )}
            </Pressable>
            <Text style={styles.headerTitle}>
              {hundred} - {word}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            {colorScheme === 'dark' ? (
              <>
                <Pressable onPress={() => alert('Call Saved')}>
                  <Image style={styles.icon} source={require('../assets/images/saved-white.png')} />
                </Pressable>
                <Pressable onPress={() => alert('Call Game')}>
                  <Image style={styles.icon} source={require('../assets/images/game-white.png')} />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => alert('Call Saved')}>
                  <Image style={styles.icon} source={require('../assets/images/saved-black.png')} />
                </Pressable>
                <Pressable onPress={() => alert('Call Game')}>
                  <Image style={styles.icon} source={require('../assets/images/game-black.png')} />
                </Pressable>
              </>
            )}
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {wordList.slice(Number(word) - 5, Number(word) - 5 + 5).map((value, index) => (
            <Pressable key={index} style={[themeListStyle, true ? styles.height : null]}>
              <View style={styles.wordTitleContainer}>
                <View style={{ backgroundColor: 'white' }}>
                  <Text style={styles.wordTitle}>{value.word}</Text>
                </View>
                <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row' }}>
                  {colorScheme === 'dark' ? (
                    <>
                      <Pressable onPress={() => alert('Saved')}>
                        <Image
                          style={styles.icon}
                          source={require('../assets/images/saved-black.png')}
                        />
                      </Pressable>
                      <Pressable onPress={() => alert('Fold')}>
                        <Image
                          style={styles.icon}
                          source={require('../assets/images/arrow-down-black.png')}
                        />
                      </Pressable>
                    </>
                  ) : (
                    <>
                      <Pressable onPress={() => alert('Saved')}>
                        <Image
                          style={styles.icon}
                          source={require('../assets/images/saved-white.png')}
                        />
                      </Pressable>
                      <Pressable onPress={() => alert('Fold')}>
                        <Image
                          style={styles.icon}
                          source={require('../assets/images/arrow-down-white.png')}
                        />
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
              <View style={{ padding: 12, height: 200 }}>
                <Text>1. She had to “drag” the heavy suitcase up the stairs.</Text>
              </View>
            </Pressable>
          ))}
          {/* {array.map((value, index) => (
            <View key={index} style={themeListStyle}>
              <Pressable style={styles.listStyle} onPress={() => router.push('/hundreds')}>
                <View>
                  <Text style={styles.listTitle}>{value}</Text>
                </View>
                <View>
                  <Image style={styles.icon} source={require('../assets/images/icon.png')} />
                </View>
              </Pressable>
            </View>
          ))} */}
        </ScrollView>
        <View style={styles.advertizing}>
          <Text style={styles.advertizingText}>Advertising</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 36,
    fontFamily: 'MontserratAlternatesBlack',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
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
  listStyle: {
    height: '100%',
    padding: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternatesBlack',
  },
  darkWordList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    height: 60,
    marginBottom: 12,
    overflow: 'hidden',
  },
  lightWordList: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
    padding: 12,
  },
  advertizing: {
    backgroundColor: 'green',
    height: 50,
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advertizingText: {
    fontFamily: 'MontserratAlternatesBlack',
  },
  wordContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
    // padding: 12,
  },
  wordTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
  },
  wordTitle: {
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 24,
    fontFamily: 'MontserratBold',
  },
  height: {
    height: 120,
  },
});
