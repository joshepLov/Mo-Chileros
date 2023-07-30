import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../App';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import {LOCAL_HOST } from '@env'

export const RegisterScreen = ({ navigation }) => {
  // log data
  const { setLoggedIn } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState('')

  // data
  const [register, setRegister] = useState({
    name: '',
    lastname: '',
    username: '',
    password:'',
    email: '',
    dpi: '',
    phone: '',
    age: '',
  });

  //obtain data
  const handleChange = (name, value) => {
    setRegister(({
      ...register,
      [name]: value
    }));
  };

  //fuction for register user
  const registerUser = async () => {
    try {
      // bd
    //   console.log(register);
    //   const responsetest = await axios.post(`http://${LOCAL_HOST}/user/test`);
    //   let dataTest = responsetest.data
    //   console.log(responsetest);

      const response = await axios.post(`http://${LOCAL_HOST}/user/register`, register);
      // save data
      let data = response.data;
      console.log(response.data)
      console.log(data.id);

      if (data) {
        if (profileImage) {
          let ext = profileImage.substring(profileImage.lastIndexOf('.') + 1)

          const formData = new FormData()
          formData.append('image', {
            name: `${data.id}.${ext}`,
            uri: profileImage,
            type: 'image/jpeg'
          })
          console.log(formData);
          await axios.put(`https://${LOCAL_HOST}/UploadImage/${data.id}`, formData, {
            headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
          })
        }
      }

      AsyncStorage.setItem('token', data.token)
      AsyncStorage.setItem('id', data.id)
      //validate register
      if (data.token) {
        setLoggedIn(true)
        alert(data.message);
        //change screen ingo user 
        navigation.navigate('home')
      } else {
        alert('ocurrio un error en el registro, porfavor verifica tus datos')
      }
    } catch (e) {
      console.log(e.response.data.message);
      alert(data.message)
      return ('Error al iniciar sesión');
    }
  };

  const goTo = () => {
    navigation.navigate('AccountIndex')
  }


  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      alert('Sorry, we need permission to upload an image :(')
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      })

      if (!response.canceled) {
        setProfileImage(response.assets[0].uri)
      }
    }
  }
  // un comentario para un merge 
  // styles 
  return (
    <ScrollView style={{ width: '100%', marginTop: Constants.statusBarHeight }}>

      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={value => handleChange("name", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={value => handleChange("lastname", value)}

        />


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputside}
            placeholder="Edad"
            onChangeText={value => handleChange("age", value)}

          />

          <TextInput
            style={styles.inputside}
            placeholder="DPI"
            onChangeText={value => handleChange("dpi", value)}

          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={value => handleChange("email", value)}

        />

        <TextInput
          style={styles.input}
          placeholder="telefono"
          onChangeText={value => handleChange("phone", value)}

        />

        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={value => handleChange("username", value)}

        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={value => handleChange("password", value)}

        />

        <TouchableOpacity style={[styles.button, { marginBottom: 15 }]} onPress={openImageLibrary}>
          <Text style={styles.buttonText}>Select a photo</Text>
        </TouchableOpacity>

        {/* {
          profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: '100%', height: '30%' }} />
          ) : (
            <></>
          )
        } */}

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text onPress={goTo} style={styles.titleSession} >¿Ya posees una cuenta?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 49,
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
  titleSession: {
    marginTop: 17,
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
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
