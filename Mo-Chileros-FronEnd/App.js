//importaciones estructura
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

//paginas 
import { AuthNavigation } from './src/Navigation/AuthNavigation';


export const AuthContext = createContext()

export default function App() {
  
  

  const [loggedIn, setLoggedIn] = useState(null);
  const [dataUser, setDataUser] = useState({
    name: '',
    role: '',
    id:'',
  })
  console.log(dataUser);
  //funcion para obtener y setear datos 

  //chekear log
  let checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedData = await AsyncStorage.getItem('id')
          
      } catch (error) {
        console.log('Error retrieving token:', error);
        setLoggedIn(null);
      }
    }
    
    //reload 
    useEffect(() => {
      checkToken();
    }, []);

    const AuthProvider = ({ children }) => {
      return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
          <AuthNavigation/>
        </AuthContext.Provider>
      );
    };
    
    return (
      <NavigationContainer>
      <AuthProvider>
        <AuthNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
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
