import React from 'react';
import { ScrollView,View, Text, StyleSheet, Image, Button,TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import { Loading } from '../../Components/Loading';

export const GetTravel = () => {
    const [travel, setTravel] = useState([{}])
    const [loading, setloading] = useState(true)
    
    // funcion para obtener usuarios
    const getTravelsMochilero = async () => {
      try {
        // obtener token asincronico 
        const token = await AsyncStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': token
        }
        console.log(token);
        let response = await axios.get(`http://${LOCAL_HOST}/travel/getTravelsMochilero`, {headers:headers});
        console.log(response.data.travels);
        //guardar usuarios
        setTravel(response.data.travels);
        setTimeout(()=> setloading(false), 1000);
  
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    };
    
   //funcion para ir a pantalla Informacion de usuario
    const goTo =(id)=>{
      navigation.navigate('UserInfo', {_id:id})
    }
    //esperar datos
    useEffect(() => {
      const fetchData = async () => {
        await getTravelsMochilero();
        headers;
      };
    
      fetchData();
    }, []);
    
    if (loading) return <Loading/>
    return (
      //vista
      <ScrollView style={styles.body}>
  
      <View >
        <Text style={styles.name}> Users</Text>
            {
              travel?.map(({_id, place, dateStart, photo}, index)=>{
                return(
  
                  <View >
                   
                  <TouchableOpacity onPress={()=>goTo(_id)}>
                <View style={styles.card} key={index} >
                {
                  photo?(
                    <Image source= {{ uri: `${photo}` }} style={styles.photo} />
  
                  ):(
                    <Image source= {{ uri: `https://is3-ssl.mzstatic.com/image/thumb/Purple71/v4/c4/c9/22/c4c92239-6e4f-e63b-6c9b-a58d36bf11d0/source/512x512bb.jpg` }} style={styles.photo} />
                  )
                }
                <View style={styles.nameContainer} onPress ={goTo}>
              <Text style={styles.place}>{place}</Text>
              <Text style={styles.role}>{dateStart}</Text>
            </View>
          
               </View>
                  </TouchableOpacity>
  
                </View>
           
           
           
           )
          })
        }
  
      </View>
        </ScrollView>
            
        );
      };
      
      const styles = StyleSheet.create({
        body: {
          marginTop: 100,
          pointerEvents: 'auto',
        },
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
          padding: 16,
          shadowColor: '#000000',
          shadowOffset: {
            width: 40,
            height: 50,
          },
          borderBottomWidth: 1, 
          borderBottomColor: '#CCCCCC', 
        },
        photo: {
          width: 80,
          height: 80,
          borderRadius: 40,
          marginRight: 16,
          alignSelf: 'flex-start',
        },
        nameContainer: {
          pointerEvents: 'auto',
          flex: 1,
        },
        name: {
          color: '#000000',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        role: {
          color: '#000000',
          fontSize: 11,
          marginBottom: 8,
        },
        details: {
          fontSize: 14,
        },
      });