import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
=======
import { LogInScreen } from './src/screens/LogInScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Navigation } from './Navigation';

export default function App() {
  
  return (
  <Navigation></Navigation>
    
>>>>>>> origin/mhurtado
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
