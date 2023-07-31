import React, {useState, useEffect, useContext} from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Button} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import axios from 'axios';
import {  AuthContext } from '../../../App';
import { CalendarTest } from '../../Components/CalendarTest';
import LoginScreen from '../Account/LoginScreen';
import { useNavigation } from '@react-navigation/native';


export const ReservationTransport = () => {

    const navigation = useNavigation();
    const {loggedIn} = useContext(AuthContext)

    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
  
    // Función para manejar las fechas seleccionadas
    const handleDatesSelected = (start, end) => {
      setDateStart(start);
      setDateEnd(end);
    };

    let dates = [ 
     dateStart, 
     dateEnd
    ]

    const routeParams = useRoute();
    const {routeId}= routeParams.params;
    const {travel} = routeParams.params
  
    console.log(routeId);

  const saveDate = async () => {
    try {
           //headers para listar y obtener permisos 
           const token = await AsyncStorage.getItem('token')
           const headers = {
             'Content-Type': 'application/json',
             'Authorization': token
           }
          
          

      const response = await axios.post(`http://${LOCAL_HOST}/reservationTrasnport/createReservation/${travel}/${routeId}`,({}) ,{headers:headers});
      //save data
      const data = response.data;
   
      //validate message
        alert(data.message)
        navigation.navigate('home')
        
      
    } catch (e) {
      console.log(e);
      return ('Error al iniciar sesión');
    }
  };
  useEffect(() => {
    saveDate();
}, []);     


    return (
        <>
       
    </> 
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
    },
    selectedDatesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      marginBottom: 8,
    },
  });
