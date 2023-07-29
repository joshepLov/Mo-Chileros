import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PLACEHOLDER_IMAGE_URL =
  'https://media.traveler.es/photos/61377d2370e3cff8b85f9d8b/16:9/w_1200,h_675,c_limit/28469.jpg';


export const CardRoute = ({ photo, placeName, caption, name, ky, idRoute }) => {
  
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  //expandir texto 
  const toggleCaption = () => {
    setExpanded(!expanded);
  };

  const goToRoute = (idRoute)=>{
    navigation.navigate('RouteView', {routeId:idRoute })
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.placeView}>
        <Foundation name="flag" size={25} color="black" />
        <View style={styles.namePlace}>
          <Text style={styles.placeText}>{placeName}</Text>
          <Text style={styles.nameText}>este es un texto</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>goToRoute(idRoute)} key={ky}>
      <Image source={{ uri: PLACEHOLDER_IMAGE_URL }} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.mainNameView}>
        <View style={styles.nameView}>
          <Text style={styles.username}>{placeName}</Text>
        </View>
        <MaterialIcons name="bookmark" size={24} color="black" />
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