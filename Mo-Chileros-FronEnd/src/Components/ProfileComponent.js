import React, { useContext, useState, useEffect, } from 'react'
import { AuthContext } from '../../App'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import {LOCAL_HOST} from '@env'
import { Loading } from './Loading';

export const ProfileComponent = ({_id}) => {

  const navigation = useNavigation();

  const [user, setUser] = useState()
  //obtener contexto si esta loggeado 
  const { setLoggedIn, setDataUser, dataUser } = useContext(AuthContext)

  const [loading, setloading] = useState(true)

  //funcion para obtener Usuario
  const getUser = async () => {
    try {
      //headers para listar y obtener permisos 
      const token = await AsyncStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      }

      //id
      let response = await axios.get(`http://${LOCAL_HOST}/user/getUser/${_id}`, { headers: headers });

      //setear data
      setUser(response.data.userData);

      //esperar datos
      setTimeout(() => setloading(false), 1000);
    } catch (err) {
      console.error(err);
    }
  };

 



  useEffect(() => {
    console.log(user);
    getUser();
  }, [])

  // esperar datos
  if (loading) return <Loading></Loading>;

  return (
    <View className='bg-white'>
      <ScrollView >
        <View style={styles.header}>

          <>
            <Image
              source={{ uri: `http://${LOCAL_HOST}/user/getImage/${user.image}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{user.name} {user.surname}</Text>
            <Text style={styles.subtitle}>{user.email}</Text>
          </>
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 10
  }
})
