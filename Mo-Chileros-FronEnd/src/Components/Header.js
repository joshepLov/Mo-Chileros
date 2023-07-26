import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import {useFonts} from 'expo-font'

export const Header = () => {

    const [fontsLoaded] = useFonts ({
        'Caesar Dressing' : require('../../assets/fonts/CaesarDressing-Regular.ttf')
    })
    if(fontsLoaded){
        return (
            <>
       
            {/* // esto tiene que ser un componente  */}
          <View style={styles.headerContainer}>
            <Text style={styles.logo}>Mochileros</Text>
            {/* Aquí puedes agregar elementos de navegación adicionales */}
          </View>
          
          </>
        )
    }else{
        return(
            <Text>no carga</Text>
        )
    }
}

const styles = StyleSheet.create({
    body:{
        marginTop: 30
      },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
      },
    logo: {
      color:'green',
        textAlign: 'left',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Caesar Dressing'
      },
})