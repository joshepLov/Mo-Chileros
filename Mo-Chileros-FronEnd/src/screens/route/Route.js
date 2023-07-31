import React, {useState, useEffect, useContext} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteComponentt } from '../../Components/RouteComponentt';
import {  AuthContext } from '../../../App';

export const Route = ({navigation}) => {

const [loading, setLoading] = useState(true)

    
    const { dataUser } = useContext(AuthContext)

    let rol = dataUser.role
    if(dataUser.User == '') {
      console.log(true);
      rol = null
    }
    console.log(dataUser, 'en route ');
  const routeParams = useRoute();
  const {routeId} = routeParams.params;
  console.log(routeId)
  console.log(dataUser.role)
  return (
  <>
  {
    rol == 'ADMIN' || rol =='MODERADOR' ? (
      <RouteComponentt
      routeId ={routeId}
      role={rol}/>
    
    ):(
      <RouteComponentt
      routeId ={routeId}
      role={''}
      />
    )
  }
  
  
  </>
  )
}
