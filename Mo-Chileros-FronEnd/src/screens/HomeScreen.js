import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { Header } from '../Components/Header';
import * as Fonts from '../utils/Fonts'
import { CardRoute } from '../Components/CardRoute';


export const HomeScreen = ({ username, image, caption }) => {
  return (  
    <View style={styles.body}>
      <Header></Header>
      <CardRoute
        username={'juanito'}
        caption={'Explorando por las serpenteantes sendas, descubrí un paraíso escondido. Montañas majestuosas se alzaban hacia el cielo, bañadas por la cálida luz del atardecer. El río cristalino susurraba melodías mientras acariciaba los prados verdes. Un lugar mágico que me hizo sentir pequeño frente a la inmensidad de la naturaleza. Cada instante en este edén es un sueño hecho realidad. El viajero en mí se regocija al encontrarse con tal maravilla. ¡Qué dicha poder contemplar esta belleza única en el mundo!'}
      ></CardRoute>
  </View>
)
}

const styles = StyleSheet.create({
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
