import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '../screens/HomeScreen'
import Navigation from './Navigation'
import { RegisterScreen } from '../screens/Account/RegisterScreen'
import { Route } from '../screens/route/Route'

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



    </Stack.Navigator> 
  )
}
