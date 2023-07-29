import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import { Loading } from './Loading';
import axios from 'axios';


export const RouteComponentt = ({routeId, role}) => {
    
    const imagePhoto = 'https://nuevomundo.gt/cms/img/articulos/antigua-guatemala-es-el-mejor-destino-de-centroamerica-para-visitar-114658-114841.jpg'
    const [route, setRoute] = useState()
    const [loading, setLoading] = useState(true)
    
    
    
    //funcion para obtener Ruta
    const getRoute = async () => {
        try {
         
            //FUNCION PARA COMPROBAR SI ES AADMIN Y DEVOLVER DATA
            if(role == 'ADMIN'|| role == 'MODERATOR'){

                //headers para listar y obtener permisos 
                const token = await AsyncStorage.getItem('token')
                const headers = {
                'Content-Type': 'application/json',
                'Authorization': token
                }

                let response = await axios.get(`http://${LOCAL_HOST}/route/getRouteModerator/${routeId}`, {headers:headers});
        
                 //setear data
                setRoute(response.data.route);
                //esperar datos
                setTimeout(()=> setLoading(false), 1000);
            }else if(!role || role == 'MOCHILERO' ){

                let response = await axios.get(`http://${LOCAL_HOST}/route/getRoute/${routeId}`);
        
                //setear data
                setRoute(response.data.route);
                //esperar datos
                setTimeout(()=> setLoading(false), 1000);
            }
        } catch (err) {
            console.error(err);
        }
        };

        useEffect(() => {
            getRoute();
        }, []);     

        if(loading) return(<Loading/>)
        
        return (
            <ScrollView style={styles.container}>
              {/* Imagen de la ruta */}
              <Image source={{ uri: imagePhoto }} style={styles.image} />
        
              {/* Detalles de la ruta */}
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{route.name}</Text>
                <Text style={styles.place}>{route.place}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.score}>{route.score}</Text>
                  <Text style={styles.ratingText}>Puntuación</Text>
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
        });