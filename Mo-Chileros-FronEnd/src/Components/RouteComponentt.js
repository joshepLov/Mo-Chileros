import React, {useState, useEffect, } from 'react';
import { View, Image, Text, StyleSheet,  ScrollView, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import { Loading } from './Loading';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export const RouteComponentt = ({routeId, role}) => {
    const navigation = useNavigation();
    
    const imagePhoto = 'https://nuevomundo.gt/cms/img/articulos/antigua-guatemala-es-el-mejor-destino-de-centroamerica-para-visitar-114658-114841.jpg'
    const [route, setRoute] = useState()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    
    
    
    //funcion para obtener Ruta
    const getRoute = async () => {
        try {
         
            //FUNCION PARA COMPROBAR SI ES AADMIN Y DEVOLVER DATA
            if(role == 'ADMIN'|| role == 'MODERADOR'){

                //headers para listar y obtener permisos 
                const token = await AsyncStorage.getItem('token')
                const headers = {
                'Content-Type': 'application/json',
                'Authorization': token
                }

                let response = await axios.get(`http://${LOCAL_HOST}/route/getRouteModerator/${routeId}`, {headers});
                console.log(response.data.route);
                 //setear data
                setRoute(response.data.route);
                //esperar datos
                setTimeout(()=> setLoading(false), 1000);
            }else{

              console.log('adentro');
                let response = await axios.get(`http://${LOCAL_HOST}/route/getRoute/${routeId}`);
                console.log(response.data.route);
                //setear data
                setRoute(response.data.route);
                //esperar datos
                if(route == undefined){}
                setRoute(response.data.route);

                setTimeout(()=> setLoading(false), 1000);
               
            }
        } catch (err) {
            console.error(err);
        }
        };

        //funcion para obtener Usuario
  const getUser = async () => {
    try {
        //headers para listar y obtener permisos 
        const token = await AsyncStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': token
        }
       let response = await axios.get(`${REACT_APP_LOCAL_HOST}/user/get/${_id}`, {headers:headers});
      
       //setear data
        setUser(response.data.user);
        //esperar datos
        setTimeout(()=> setloading(false), 1000);
      } catch (err) {
        console.error(err);
      }
    };

    
  const renderStars = (score) => {
    const stars = [];
    for (let i = 0; i < score; i++) {
      stars.push(
        <MaterialIcons key={i} name="star" size={12} color="#FDAF01" />
      );
    }
    return stars;
  };


    const goTo = (routeId)=>{
        navigation.navigate('CreateTravel', {route:routeId})
    }

        useEffect(() => {
            getRoute();
        }, []);     

        if(loading) return(<Loading/>)
        
        return (
            <ScrollView style={styles.container}>
              {/* Imagen de la ruta */}
              <Image source={{ uri: `http://${LOCAL_HOST}/route/getImage/${route.image}` }} style={styles.image} />
        
              {/* Detalles de la ruta */}
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{route.name}</Text>
                <Text style={styles.place}>{route.place}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Puntuación:  </Text>
                {renderStars(route.score)}
                </View>
                <Text style={styles.price}>Precio por noche: ${route.price}</Text>
                <Text style={styles.capacity}>Capacidad: {route.capacityMembers} personas</Text>
        
                <Text style={styles.descriptionTitle}>Descripción:</Text>
                <Text style={styles.description}>{route.description}</Text>
        
                {/* Lista de actividades */}
                {/* <View style={styles.activitiesContainer}>
                  <Text style={styles.activitiesTitle}>Actividades:</Text>
                  {activities.map((activity, index) => (
                    <Text key={index} style={styles.activity}>
                      {activity.Activity}
                    </Text>
                  ))}
                </View> */}

        <TouchableOpacity style={styles.button} onPress={()=>{goTo(routeId)}}>
          <Text style={styles.buttonText}>Viaja Y conoce!</Text>
        </TouchableOpacity>
             
              </View>
            </ScrollView>
          );
        };
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
          image: {
            width: '100%',
            height: 250,
            resizeMode: 'cover',
          },
          detailsContainer: {
            padding: 16,
          },
          name: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 8,
          },
          place: {
            fontSize: 18,
            color: '#888',
            marginBottom: 8,
          },
          ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          },
          score: {
            fontSize: 24,
            fontWeight: 'bold',
            marginRight: 8,
          },
          ratingText: {
            fontSize: 18,
            color: '#888',
          },
          price: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
          },
          capacity: {
            fontSize: 16,
            marginBottom: 16,
          },
          descriptionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
          },
          description: {
            fontSize: 16,
            marginBottom: 16,
            color: '#555',
            lineHeight: 24,
          },
          activitiesContainer: {
            marginBottom: 16,
          },
          activitiesTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
          },
          activity: {
            fontSize: 16,
            marginBottom: 4,
            color: '#555',
          },
          button: {
            backgroundColor: '#FDAF01',
            borderRadius: 120,
            paddingVertical: 12,
          },
          buttonText: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
          },
        });