import React, { useEffect, useState, useContext} from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { CardRoute } from '../../Components/CardRoute'
import axios from 'axios';
import {LOCAL_HOST} from '@env'
import { Loading } from '../../Components/Loading';
import { AuthContext } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FloatingButtom } from '../../Components/FloatingButtom';

export const Hotel = ({id}) => {

  const { dataUser } = useContext(AuthContext)
  //para esperar datos
  const [loading, setLoading] = useState(true)
  //ruta
  const [hotel, setHotel] = useState([{}])


//funcion obtener rutas
 const getHotels = async() =>{
  try {
    console.log(dataUser);
    if(dataUser.role == 'ADMIN'|| dataUser.role == 'MODERADOR'){

            //headers para listar y obtener permisos 
            const token = await AsyncStorage.getItem('token')
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': token
            }
      let response = await axios.get(`http://192.168.1.9:3418/hotel/getHotelsModerator`, {headers:headers})
      let data = response.data
      console.log(data);
      console.log(response.data.hotels);
 
      setHotel(response.data.hotels)
   
  
      setTimeout(()=> setLoading(false), 1000)

    }else {
    let response = await axios.get(`http://192.168.1.9:3418/hotel/getHotels`)
    let data = response.data
    console.log(data);
    setHotel(response.data.hotels)
    console.log(hotel);

    setTimeout(()=> setLoading(false), 1000)}
    
  } catch (err) {
    console.log(err)
    alert('error')
  }

 }
 console.log(id, 'id travel');

//  const routeParams = useRoute();
//  const {idTravel}= routeParams.params;


 useEffect(()=>{
    const fetchData = async ()=>{
      await getHotels();
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
        dataUser.role == 'ADMIN' || dataUser.role=='MODERAROR'?
       ( hotel?.map(({_id, name,  description, image}, index)=>{
          console.log('admin');  
          if(image == undefined){
            return (
              <CardRoute
              key={index}
              iconDesign={'hotel'}
              image={null}
              schema={'hotel'}
              schemaroute={'getImage'}
              navigate ={'Rooms'}
              idRoute={_id}
              idtravel={id}
              placeName={name}
              caption={description}
              ></CardRoute>
              
                
            
                )
          }else{
            return (
              <CardRoute
              key={index}
              iconDesign={'hotel'}
              image={image}
              schema={'hotel'}
              schemaroute={'getImage'}
              navigate ={'Rooms'}
              idRoute={_id}
              idtravel={id}
              placeName={name}
              caption={description}
              ></CardRoute>

                )
          }
          })
          ):(
            hotel?.map(({_id, name,  description, image}, index)=>{
              console.log('no admin');
              if (image == null) {
                return (
                  <CardRoute
                  key={index}
                  iconDesign={'hotel'}
                  image={null}
                  schema={'hotel'}
                  schemaroute={'getImage'}
                  navigate ={'Rooms'}
                  idtravel={id}
                  idRoute={_id}
                  placeName={name}
                  caption={description}
                  ></CardRoute>
                  
                  )
              }else{

                return (
                  <CardRoute
                  key={index}
                iconDesign={'hotel'}
                image={image}
                schema={'hotel'}
                schemaroute={'getImage'}
                navigate ={'Rooms'}
                idRoute={_id}
                idtravel={id}
                placeName={name}
                caption={description}
                ></CardRoute>
                
                )
              }
              })
              )
        }
      </ScrollView>
      {dataUser.role == 'ADMIN' || dataUser.role == 'MODERADOR'?(
        <FloatingButtom nav={'Hotel'}></FloatingButtom>
        ):(
          <></>
          
        )}
  </View>
)
}
//a
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
  float:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8, // Sombra en Android
  },
});
