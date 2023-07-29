import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const Loading = () => {
  return (
    <Image 
    source={require('../../assets/backpack-load-unscreen.gif')}
    style={styles.gif}
     />  
 )

}
 const styles = StyleSheet.create({
    gif:{
      height: '50%', 
      width:'70%',
      marginTop:'50%',
      display:'flex',
      alignItems: 'center',
      marginLeft:'15%', 
      marginRight:'15%'
    }
    })
