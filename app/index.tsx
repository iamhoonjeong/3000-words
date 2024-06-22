import { StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

const array = new Array(30).fill(0).map((array, index) => (index + 1) * 100);

export default function Home() {
  const colorScheme = useColorScheme();
  const themeListStyle = colorScheme === 'dark' ? styles.darkList : styles.lightList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>Words</Text>
          </View>
          <View style={styles.iconContainer}>
            {colorScheme === 'dark' ? (
              <Image style={styles.icon} source={require('../assets/images/saved-white.png')} />
            ) : (
              <Image style={styles.icon} source={require('../assets/images/saved-black.png')} />
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
                onPress={() => router.push(`/hundreds?hundred=${value}`)}
              >
                <View>
                  <Text style={styles.listTitle}>{value}</Text>
                </View>
                <Pressable onPress={() => alert('Click done')}>
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
    marginLeft: 12,
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
  darkList: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    height: 120,
    marginBottom: 12,
  },
  lightList: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    height: 120,
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
