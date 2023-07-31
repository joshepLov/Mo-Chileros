import React, { useContext, useState, useEffect, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../App'

export const SettingScreen = () => {
    const { setLoggedIn, setDataUser, dataUser } = useContext(AuthContext)
  const navigation = useNavigation();

    //funcion para cerrar sesion
    const logOut = () => {
        setDataUser('');
        setLoggedIn(null)
        AsyncStorage.clear()
        navigation.navigate('home')
    }

    //policity 
    const goSecurity = () =>{
        navigation.navigate('Security')
    }
    
    //about
    const goAbout = () =>{
        navigation.navigate('About')
    }
    
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.item} onPress={goAbout}>
            <Text style={styles.itemText}>Acerca de</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.item} onPress={goSecurity}>
            <Text style={styles.itemText}>Seguridad y privacidad</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      item: {
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      itemText: {
        fontSize: 16,
      },
      logoutButton: {
        marginTop: 20,
        backgroundColor: '#4C348A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
