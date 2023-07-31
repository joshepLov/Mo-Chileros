import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../App';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import {LOCAL_HOST } from '@env'
import { useNavigation } from '@react-navigation/native';

export const CreateHotel = () => {

  const navigation = useNavigation();
  // data
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    description: '',
 
  });
 
  //obtain data
  const handleChange = (name, value) => {
    setHotel(({
      ...hotel,
      [name]: value
    }));
  };
 
  //fuction for register user
  const createHotel = async () => {
    try {
       //headers para listar y obtener permisos 
       const token = await AsyncStorage.getItem('token')
       const headers = {
         'Content-Type': 'application/json',
         'Authorization': token
       }
 
      const response = await axios.post(`http://${LOCAL_HOST}/hotel/createHotel`, hotel, {headers});
      // save data
      let data = response.data;
       let id = data.hotel._id
      //validate register
      if (data.hotel) {
        //change screen ingo user 
        navigation.navigate('BlankHotel' , {routeId:id})
      } else {
        alert('ocurrio un error en el registro, porfavor verifica tus datos')
      }
    } catch (e) {
         console.log(e);
    }
  };
 
 
  // un comentario para un merge 
  // styles 
  return (
    <ScrollView style={{ width: '100%', marginTop: Constants.statusBarHeight }}>
 
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Hotel</Text>
 
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={value => handleChange("name", value)}
        />
 
 
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputside}
            placeholder="Direccion"
            onChangeText={value => handleChange("address", value)}
          />
 
        </View>
         <TextInput
         style={styles.inputFat}
         placeholder="Descripcion"
         onChangeText={value => handleChange("description", value)}
 
         />
         <Text style={styles.minText}>recuerda que este solo es un estimado de lo que puede durar tu viaje</Text>
 
        {/* <TouchableOpacity style={[styles.button, { marginBottom: 15 }]} onPress={openImageLibrary}>
          <Text style={styles.buttonText}>Select a photo</Text>
        </TouchableOpacity> */}
 
      
 
        <TouchableOpacity style={styles.button} onPress={createHotel}>
          <Text style={styles.buttonText}>Nuevo Hotel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
 };
 
 const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  minText:{
     marginTop:10,
     textAlign:'center',
     color: 'gray', 
     fontSize:10, 
     marginBottom:18
  },
  titleSession: {
    marginTop: 17,
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    textAlign:'center',
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#e6e6e6', 
    borderRadius: 50,
  },
  inputside: {
    textAlign:'center',
    flex: 1,
    height: 40,
    marginRight: 8,
    paddingHorizontal: 8,
    backgroundColor: '#e6e6e6',
    borderRadius: 50,
  },
  inputFat:{
    marginTop:20,
    height:100,
    textAlign:'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#e6e6e6', 
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#4C348A',
    borderRadius: 120,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
 });
 
 