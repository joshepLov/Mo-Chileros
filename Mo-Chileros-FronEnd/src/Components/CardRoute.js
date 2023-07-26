import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialIcons } from '@expo/vector-icons';


const PLACEHOLDER_IMAGE_URL =
  'https://media.traveler.es/photos/61377d2370e3cff8b85f9d8b/16:9/w_1200,h_675,c_limit/28469.jpg';


export const CardRoute = ({ photo, placeName, caption }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleCaption = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.placeView}>
        <Foundation name="flag" size={25} color="black" />
        <View style={styles.namePlace}>
          <Text style={styles.placeText}>San juan la laguna</Text>
          <Text style={styles.nameText}>este es un texto</Text>
        </View>
      </View>
      <Image source={{ uri: PLACEHOLDER_IMAGE_URL }} style={styles.postImage} />
      <View style={styles.mainNameView}>
        <View style={styles.nameView}>
          <Text style={styles.username}>Un viaje por el Lago de Atitlan</Text>
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