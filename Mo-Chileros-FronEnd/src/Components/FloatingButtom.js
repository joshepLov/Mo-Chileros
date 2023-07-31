import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const FloatingButtom = ({nav, id}) => {


    
    const navigation = useNavigation();
    const newRoute =()=>{
      if(nav == 'Hotel'){

        navigation.navigate('CreateHotel')
      }else if(nav=='CreateRoom'){
        navigation.navigate('CreateRoom', {route :id})
      }else if( nav = 'CreateTransport'){
        navigation.navigate('CreateTransport')
      }
       else{
      navigation.navigate('NewRoute')
    }
  }

 
      const actionshotel = [
        {
          text: 'Nuevo Hotel',
          icon:<AntDesign name="pluscircleo" size={24} color="white" />, // Agrega la ruta correcta a tu icono 1
          name: 'New Route',
          position: 1,
        },
  
        // Agrega más acciones según sea necesario
      ];
    
      const actionroom = [
        {
          text: 'Nueva Habitacion',
          icon:<AntDesign name="pluscircleo" size={24} color="white" />, // Agrega la ruta correcta a tu icono 1
          name: 'New Route',
          position: 1,
        },
  
        // Agrega más acciones según sea necesario
      ];
        
      const actionTransport = [
        {
          text: 'Nuevo Transporte',
          icon:<AntDesign name="pluscircleo" size={24} color="white" />, // Agrega la ruta correcta a tu icono 1
          name: 'New Route',
          position: 1,
        },
  
        // Agrega más acciones según sea necesario
      ];
    
    const actions = [
        {
          text: 'Nuevo viaje',
          icon:<AntDesign name="pluscircleo" size={24} color="white" />, // Agrega la ruta correcta a tu icono 1
          name: 'New Route',
          position: 1,
        },
        {
          text: 'Codigo de viaje',
          icon: <AntDesign name="qrcode" size={24} color="white" />, // Agrega la ruta correcta a tu icono 2
          name: 'action2',
          position: 2,
        },
        // Agrega más acciones según sea necesario
      ];
    
      return (
        <View style={styles.container}>
          {/* Contenido principal de la pantalla */}
          {/* ... */}
    
          {/* Botón flotante */}
          {
            nav =='Hotel'?(
              <FloatingAction
              actions={actionshotel}
              onPressItem={newRoute}
              color="orange" // Color de fondo del botón flotante (amarillo)
              />
              
              ):nav=='CreateRoom' ?(    
                <FloatingAction
                actions={actionroom}
                onPressItem={newRoute}
                color="orange" // Color de fondo del botón flotante (amarillo)
              />
            
          ):(
            <FloatingAction
            actions={actions}
            onPressItem={newRoute}
            color="orange" // Color de fondo del botón flotante (amarillo)
          />
          )
          }
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#oreange',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });