import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Button, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import { MaterialIcons } from '@expo/vector-icons';
import {LOCAL_HOST } from '@env'
import { useNavigation } from '@react-navigation/native';


export const ImageRoute = ({schema,routeschema, nav, routeId}) => {
    
    const navigation = useNavigation();
    

    const [profileImage, setProfileImage] = useState('')

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

  const upImage = async()=>{
   try {
 
         console.log(profileImage);
         
         let ui = routeId
         if (profileImage) {
           let ext = profileImage.substring(profileImage.lastIndexOf('.') + 1)
    
  
  
           const formData = new FormData()
           formData.append('image', {
             name: `${ui}.${ext}`,
             uri: profileImage,
             type: 'image/jpeg'
           })
  
  
           console.log(formData);
          let img = await axios.put(`http://${LOCAL_HOST}/${schema}/${routeschema}/${routeId}`, formData, {
             headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
           })
           console.log(img.data.UpdateUserImage, 'imagen se actualiza')
           //validate register
           if (img.data) {
             console.log(nav, 'adentro')
             if(nav == 'CreateTravel'){
                 navigation.navigate('CreateTravel', {route: routeId})
             }else if(nav =='createRoom'){
              navigation.navigate('createRoom', {route: routeId})
             }else {
              navigation.navigate('home')
              
             }
           } else {
             alert('ocurrio un error en el registro, porfavor verifica tus datos')
           }
         }
       
   } catch (error) {
    console.log(error)
   }
  }
  return (
    
    <ScrollView style={{ width: '100%', marginTop: Constants.statusBarHeight }}>

    <View style={styles.container}>
    {
         profileImage ? (
           <Image source={{ uri: profileImage }} style={styles.postImage} />
         ) : (
           <></>
         )
       }
     <TouchableOpacity style={[styles.button, { marginBottom: 15 }]} onPress={openImageLibrary}>
         <Text style={styles.buttonText}>Select a photo</Text>
       </TouchableOpacity> 
       <TouchableOpacity style={[styles.button, { marginBottom: 15 }]} onPress={upImage}>
         <Text style={styles.buttonText}>SET PHOTO</Text>
       </TouchableOpacity> 
       </View>

        <View style={styles.row}>
            <Text>next</Text>
       <MaterialIcons name="navigate-next" size={24} color="black" />
        </View>
       </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: '50%',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        marginBottom:30,
      },
    row:{
        flexDirection:'row'
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
   
   
