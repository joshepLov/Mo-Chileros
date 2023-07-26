//importaciones estructura
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {useFonts} from 'expo-font'
//paginas 
import { AuthNavigation } from './src/Navigation/AuthNavigation';



export default function App() {
  
  
  const [fontsLoaded] = useFonts ({
    'Caesar Dressing' : require('./assets/fonts/CaesarDressing-Regular.ttf')
  })
  const [loggedIn, setLoggedIn] = useState(null);
  const [dataUser, setDataUser] = useState({
    name: '',
    role: '',
    photo: '',
    id:'',
  })
  //funcion para obtener y setear datos 
  const AuthProvider = ({ children }) => {
    //reload 
    useEffect(() => {
      checkToken();
    }, []);
  
    //chekear log
    let checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedData = await AsyncStorage.getItem('id')

         
      } catch (error) {
        console.log('Error retrieving token:', error);
        setLoggedIn(null);
      }
    }}
    
    if(fontsLoaded){

      return (
        <>
      <NavigationContainer>
      <AuthNavigation/>
      </NavigationContainer>
      </>
    )
  }else {
    <Text>loading</Text>
  }
 
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: 'black', 
    fontSize: 40
  }
});
