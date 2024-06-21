import { StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';

const array = new Array(10).fill(0);

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
            <Image style={styles.icon} source={require('../assets/images/icon.png')} />
            <Image style={styles.icon} source={require('../assets/images/icon.png')} />
            <Image style={styles.icon} source={require('../assets/images/icon.png')} />
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {array.map((value, index) => (
            <View key={index} style={themeListStyle}>
              <Pressable>
                <Text>asdf</Text>
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
