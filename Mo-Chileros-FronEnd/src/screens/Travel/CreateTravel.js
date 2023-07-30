import React, {useState, useEffect, useContext} from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Button} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import axios from 'axios';
import {  AuthContext } from '../../../App';
import { CalendarTest } from '../../Components/CalendarTest';
import LoginScreen from '../Account/LoginScreen';




export const CreateTravel = () => {

    
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
    const {travelid} = routeParams.params;
  
    console.log(travelid);
      // FUNTION TO LOGIN
  const saveDate = async () => {
    try {
           //headers para listar y obtener permisos 
           const token = await AsyncStorage.getItem('token')
           const headers = {
             'Content-Type': 'application/json',
             'Authorization': token
           }
           console.log(dates);
          

      const response = await axios.post(`http://${LOCAL_HOST}/travel/createTravel/64c46c19777182f457bfd945`,({dateStart ,dateEnd}), {headers:headers});
      //save data
      const data = response.data;

      //validate message
      if (data.message) {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
      return ('Error al iniciar sesión');
    }
  };

    return (
        <>
        {
            loggedIn == null?(
               <LoginScreen></LoginScreen>
                ):(
                    <View style={styles.container}>
                        <Text> elegi los dias que te gustaria viajar</Text>
                <CalendarTest onDatesSelected={handleDatesSelected} />
                
                <Button onPress={saveDate} title='press me'></Button>
              </View>
                    
                    )
                }
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
