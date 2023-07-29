import React, {useState, useEffect, useContext} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_HOST } from '@env'
import { RouteComponentt } from '../../Components/RouteComponentt';
import {  AuthContext } from '../../../App';

export const Route = ({navigation}) => {

const [loading, setLoading] = useState(true)

    
    const { dataUser } = useContext(AuthContext)
    let rol = dataUser.role
    console.log(dataUser, 'en route ');
  const routeParams = useRoute();
  const {routeId} = routeParams.params;
  console.log(routeId)
  return (
  <>
  <Text>hola</Text>
  <RouteComponentt
    routeId ={routeId}
    role={rol}/>
  </>
  )
}
