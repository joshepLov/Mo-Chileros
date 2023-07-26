import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '../screens/HomeScreen'
import Navigation from './Navigation'

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

    </Stack.Navigator> 
  )
}
