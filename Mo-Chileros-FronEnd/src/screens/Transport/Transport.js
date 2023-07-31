import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { CardRoute } from '../../Components/CardRoute'
import axios from 'axios';
import {LOCAL_HOST} from '@env'
import { Loading } from '../../Components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export const Transport = () => {
  //para esperar datos
  const [loading, setLoading] = useState(true)
  //ruta
  const [transporte, setTransporte] = useState([{}])
  const routeParams = useRoute();
  const {idTravel} = routeParams.params;
  console.log(idTravel);

//funcion obtener rutas
 const getTransport = async() =>{
  try {
      //headers para listar y obtener permisos 
      const token = await AsyncStorage.getItem('token')
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
      }
    let response = await axios.get(`http://192.168.1.9:3418/transport/getTransports`, {headers:headers})
    let data = response.data
    console.log(data);
    setTransporte(response.data.transport)
    console.log(transporte);

    setTimeout(()=> setLoading(false), 1000)
    
  } catch (err) {
    console.log(err)
    alert('error')
  }

 }

 useEffect(()=>{
    const fetchData = async ()=>{
      await getTransport();
    };
    fetchData();
 }, [])

 if (loading) return (<>
  <Loading></Loading>
 </>);
  
  return (  
    <View style={styles.body}>
      <ScrollView>

    
      {
        transporte?.map(({_id, name,  description}, index)=>{
          return (

            <CardRoute
            navigate ={'TransportReservation'}
            idtravel={idTravel}
            idRoute={_id}
            placeName={name}
            caption={description}
            ></CardRoute>
            
            )
        })
      }
      </ScrollView>
  </View>
)
}

const styles = StyleSheet.create({
  gif:{
    height: '50%', 
    width:'70%',
    marginTop:'50%',
    display:'flex',
    alignItems: 'center',
    marginLeft:'15%', 
    marginRight:'15%'
  },
  body:{
    backgroundColor:'FFFFFF',
    marginTop: 30
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  caption: {
    fontSize: 14,
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logo: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Caesar Dressing'
  },
});
