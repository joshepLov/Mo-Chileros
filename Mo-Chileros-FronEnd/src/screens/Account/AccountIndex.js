import React,{useContext, useEffect, useState} from 'react'
import {Text } from 'react-native';
import { AuthContext } from '../../../App'
import { ProfileComponent } from '../../Components/ProfileComponent'
import LoginScreen from './LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AccountIndex = () => {
    const {loggedIn} = useContext(AuthContext)

    const [idProfile, setIdProfile] = useState(null);

    useEffect(() => {
        const getUser = async () => {
          try {
            let id = await AsyncStorage.getItem('id');
            console.log(id);
            setIdProfile(id);
          } catch (error) {
            console.log('Error fetching user ID:', error);
          }
        };
        getUser(); // Corrected to call the function
      }, []);
    
    return (
      <>
        {
          loggedIn == true ? (
            idProfile !==null ? <ProfileComponent _id={idProfile} /> : <Text>Loading...</Text>
          ):(
           <LoginScreen/>
          )
        }
      </>
      
    )
  }