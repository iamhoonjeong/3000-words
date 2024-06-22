import { StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useLocalSearchParams } from 'expo-router';

const array = new Array(20).fill(0).map((array, index) => (index + 1) * 5);

export default function Hundreds() {
  const colorScheme = useColorScheme();
  const { hundred } = useLocalSearchParams<{ hundred?: string }>();

  const themeListStyle = colorScheme === 'dark' ? styles.darkList : styles.lightList;

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
            <Text style={styles.headerTitle}>{hundred}</Text>
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
          {array.map((value, index) => (
            <View key={index} style={themeListStyle}>
              <Pressable
                style={styles.listStyle}
                onPress={() => router.push(`/words?hundred=${hundred}&word=${value}`)}
              >
                <View>
                  <Text style={styles.listTitle}>{value}</Text>
                </View>
                <Pressable onPress={() => alert('Click Done')}>
                  <View>
                    {colorScheme === 'dark' ? (
                      <Image
                        style={styles.icon}
                        source={require('../assets/images/done-white.png')}
                      />
                    ) : (
                      <Image
                        style={styles.icon}
                        source={require('../assets/images/done-black.png')}
                      />
                    )}
                  </View>
                </Pressable>
              </Pressable>
            </View>
          ))}
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
    paddingLeft: 26,
    paddingRight: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternatesBlack',
  },
  darkList: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    height: 60,
    marginBottom: 12,
  },
  lightList: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 60,
    marginBottom: 12,
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
});
