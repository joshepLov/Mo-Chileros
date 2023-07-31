import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../Components/Header';
import * as Fonts from '../utils/Fonts'
import { CardRoute } from '../Components/CardRoute';
import axios from 'axios';
import {LOCAL_HOST} from '@env'
import mochila from '../../assets/backpack-load.gif'
import { Loading } from '../Components/Loading';
import { FloatingButtom } from '../Components/FloatingButtom';

export const HomeScreen = ({ username, image, caption }) => {
  //para esperar datos
  const [loading, setLoading] = useState(true)
  //ruta
  const [routes, setRoutes] = useState([{}])


//funcion obtener rutas
 const getRoutes = async() =>{
  try {
    let response = await axios.get(`http://192.168.1.9:3418/route/getRoutes`)
    let data = response.data
    setRoutes(response.data.route)
    setTimeout(()=> setLoading(false), 5500)
    
  } catch (err) {
    console.log(err)
    alert('error')
  }

 }

 useEffect(()=>{
    const fetchData = async ()=>{
      await getRoutes();
    };
    fetchData();
 }, [])

 if (loading) return (<>
  <Loading></Loading>
 </>);
  
  return (  
    <View style={styles.body}>
      <ScrollView>

      <Header></Header>
      {
        routes?.map(({_id, description, place, image}, index)=>{
          console.log(image);
          if(image== undefined){
            return (

              <CardRoute
              key={index}
              navigate={'RouteView'}
              image={null}
              idRoute={_id}
              placeName={place}
              caption={description}
              ></CardRoute>
              
              )
          }else {
            console.log('este es el que sirve', image);
            return (
              
              <CardRoute
              key={index}
              schema={'route'}
              schemaroute={'getImage'}
              image={image}
              navigate={'RouteView'}
              idRoute={_id}
              placeName={place}
              caption={description}
              ></CardRoute>
              
              )
            }
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
