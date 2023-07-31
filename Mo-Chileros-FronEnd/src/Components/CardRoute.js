import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {LOCAL_HOST} from '@env'

const logo_url =  '../../assets/logo-color.png'
export const CardRoute = ({iconDesign, image,schema,schemaroute, placeName, caption, ky, idRoute,idtravel, hotelId, navigate, user}) => {
   
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  //expandir texto 
  const toggleCaption = () => {
    setExpanded(!expanded);
  };

 
    const goToRoute = (idRoute)=>{
      if (navigate == 'Rooms' ) {
        navigation.navigate('Rooms', {routeId:idRoute, travel:idtravel})

        
      } else if( navigate == 'RouteView' ) {
        navigation.navigate(navigate, {routeId:idRoute })
        
      }else if(navigate =='RoomReservation'){
        //route es id room y room es room es el hotel
        navigation.navigate(navigate, {routeId:idRoute, travel:idtravel, hotel: hotelId})

        
      }else if(navigate =='TransportReservation'){
        //route es id room y room es room es el hotel
        navigation.navigate(navigate, {routeId:idRoute, travel:idtravel, })

        
      } 
      
      else {
        navigation.navigate(navigate)
        
      }
    }

  let url =`http://${LOCAL_HOST}/${schema}/${schemaroute}/${image}`
  console.log(url);

  return (
    <View style={styles.postContainer}>
      <View style={styles.placeView}>
        <FontAwesome name={iconDesign}size={25} color="black" />
        <View style={styles.namePlace}>
          <Text style={styles.placeText}>{placeName}</Text>
          <Text style={styles.nameText}>{user}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>goToRoute(idRoute)} key={ky}>
      {image ? (
        <Image source={{ uri: `http://${LOCAL_HOST}/${schema}/${schemaroute}/${image}` }} style={styles.postImage} />
      ) : (
        <Image source={require('../../assets/logo-color.png')} style={styles.postImage} />
      )}
      
      </TouchableOpacity>
      <View style={styles.mainNameView}>
        <View style={styles.nameView}>
          <Text style={styles.username}>{placeName}</Text>
        </View>
    
      </View>
      {expanded ? (
        <Text style={styles.caption}>{caption}</Text>
      ) : (
        <Text numberOfLines={2} style={styles.caption}>
          {caption}
        </Text>
      )}
      {caption.length > 150 && (
        <TouchableOpacity onPress={toggleCaption}>
          <Text style={styles.seeMoreButton}>{expanded ? 'Ver menos' : 'Ver más'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 20,
    marginBottom: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  placeView: {
    paddingLeft:7,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  namePlace: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 7,
  },
  placeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  nameText: {
    color: 'black',
    fontSize: 10,
    margin: 3,
  },
  mainNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  nameView: {
    flexDirection: 'row',
  },
  username: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  caption: {
    fontSize: 14,
    marginTop: 5,
    marginHorizontal: 10,
  },
  seeMoreButton: {

    color: 'gray',
    marginTop: 5,
    marginHorizontal: 10,
  },
});