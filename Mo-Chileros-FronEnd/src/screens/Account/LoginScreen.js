import React, { useState, useContext} from 'react';
import { AuthContext } from '../../../App'
import { View, TextInput,  StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {LOCAL_HOST} from '@env'

export default function LoginScreen() {
  
  const navigation = useNavigation();
  
  const { loggedIn, setLoggedIn, setDataUser, dataUser } = useContext(AuthContext);

 //DATA
  const [log, setLog] = useState({
    username: '',
    password: ''
  });

  // RECOLECT DATA
  const handleChange = (name, value) => {
    setLog( ({
      ...log,
      [name]: value
    }));
  };

  //CHANGE SCREEN
  const goTo =()=>{
    navigation.navigate('Register')
  }

  // FUNTION TO LOGIN
  const login = async () => {
    try {
      const response = await axios.post(`http://${LOCAL_HOST}/user/login`, log);
      //save data
      const data = response.data;
      AsyncStorage.setItem('token', data.token)
      AsyncStorage.setItem('id', data.logged.id)
      // setear sesion
      setLoggedIn(true)
    
      //setear los datos del usuario
      setDataUser(data.logged);
      navigation.navigate('AccountIndex' ,{idProfile:data.logged.id})
      //validate message
      if (data.message) {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
      return ('Error al iniciar sesión');
    }
  };

  return (
    // view
    <View style={styles.container}>
      <Text style={styles.findThem}>Mochileros</Text>

      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={value => handleChange("username", value)}
      />
      {/* input contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={value => handleChange("password", value)}
      />
      <View onPress={goTo}> 
      <Text style={styles.title} onPress={goTo}>¿No tienes una cuenta?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
// styles 
const styles = StyleSheet.create({
  // titulo
  findThem:{
      fontSize: 22,
      marginBottom: 16,
      textAlign: 'center',
      marginBottom:60
    
  },
  //contenedor
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  // inputs
  input: {
    textAlign:'center',
    height: 40,
    borderRadius: 8,
    borderRadius: 50,
    backgroundColor: '#e6e6e6',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#4C348A',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});