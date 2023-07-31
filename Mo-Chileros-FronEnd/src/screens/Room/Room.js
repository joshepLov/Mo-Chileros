import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { CardRoute } from '../../Components/CardRoute'
import axios from 'axios';
import {LOCAL_HOST} from '@env'
import { Loading } from '../../Components/Loading';
import { useRoute } from '@react-navigation/native';

export const Room = () => {

    const routeParams = useRoute();
    const {routeId} = routeParams.params;
    const {travel} = routeParams.params;
  //para esperar datos
  const [loading, setLoading] = useState(true)
  //ruta
  const [room, setRoom] = useState([{}])


//funcion obtener rutas
 const getTransport = async() =>{
  try {
   
    let response = await axios.get(`http://192.168.1.9:3418/hotel/getRooms/${routeId}`)
    let data = response.data
    console.log(data, 'en rooms');
    setRoom(response.data.foundRooms)
    console.log(room, 'en habitaciones ');
    console.log(travel, 'en habitaciones');

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
        room?.map(({_id, name,  capacity, price}, index)=>{
          return (

            <CardRoute
            navigate ={'RoomReservation'}
            idtravel={travel}
            hotelId={routeId}
            idRoute={_id}
            placeName={name}
            caption={price}
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