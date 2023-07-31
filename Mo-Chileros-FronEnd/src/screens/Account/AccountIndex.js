import React,{useContext, useEffect, useState} from 'react'
import {Text, StyleSheet, View,  } from 'react-native';
import { AuthContext } from '../../../App'
import { ProfileComponent } from '../../Components/ProfileComponent'
import LoginScreen from './LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../Components/Loading';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

export const AccountIndex = () => {
  const navigation = useNavigation();

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
    
      
  //go to settings 
  const goSettings =()=>{
    navigation.navigate('Settings')
  }

    return (
      <>
        {
          loggedIn == true ? (
            idProfile !==null ?( 
              <>
                        <View style={styles.icons}>
            <Entypo name={'dots-three-horizontal'} color={'black'} size={30} style={styles.icon} onPress={goSettings}/>
          </View>

              <ProfileComponent _id={idProfile} />
              </>
            
            ) : <Loading></Loading>
          ):(
           <LoginScreen/>
          )
        }
      </>
      
    )
  }

  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
  
    },
    subtitle: {
      color: '#181818',
      fontWeight: '600',
      margin: 10
    },
    image: {
      width: 200,
      aspectRatio: 1,
      borderRadius: 200,
      marginVertical: 20
    },
    header: {
      alignItems: 'center',
    },
    icons: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      padding: 10
    },
    icon: {
      paddingHorizontal: 10,
      paddingTop:40
    }
  })