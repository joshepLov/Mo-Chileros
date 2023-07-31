import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '../screens/HomeScreen'
import Navigation from './Navigation'
import { RegisterScreen } from '../screens/Account/RegisterScreen'
import { Route } from '../screens/route/Route'
import { CreateTravel } from '../screens/Travel/CreateTravel'
import { Hotel } from '../screens/Hotel/Hotel'
import { Room } from '../screens/Room/Room'
import { Transport } from '../screens/Transport/Transport'
import { RoomReservation } from '../screens/ReservationRoom/RoomReservation'
import { ReservationTransport } from '../screens/reservationTransport/ReservationTransport'

const Stack = createStackNavigator()


export const AuthNavigation = () => {
  return (
    <Stack.Navigator
    name = 'home'
    component ={Navigation}
    screenOptions={{
        headerShown: false
    }}>

    <Stack.Screen
    name = 'home'
    component ={Navigation}
    screenOptions
    />

    <Stack.Screen
    name='Register'
    component={RegisterScreen}/>

    <Stack.Screen
    name= 'RouteView'
    component={Route}
    />

    <Stack.Screen
    name='CreateTravel'
    component={CreateTravel}/>

    <Stack.Screen 
    name='Hotels'
    component={Hotel}
    />

    <Stack.Screen
    name='Rooms'
    component={Room}/>

    <Stack.Screen
    name='Transport'
    component={Transport}/>

   <Stack.Screen
   name='RoomReservation'
   component={RoomReservation}/> 

   <Stack.Screen
    name='TransportReservation'
    component={ReservationTransport}/>


    </Stack.Navigator> 
  )
}
