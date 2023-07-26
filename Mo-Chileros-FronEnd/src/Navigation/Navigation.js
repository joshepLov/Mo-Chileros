import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font'

import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { LogInScreen } from '../screens/LogInScreen';
import { TestScreen } from '../screens/TestScreen';
import theme from '../utils/userThem';

const Tab = createBottomTabNavigator()
// const Stack = createNativeStackNavigator();

export default MyTabs = () => {
 

    return (
      
    <Tab.Navigator 
    ruta inicial o predeterminada
    initialRouteName='HomeTab'
    screenOptions={({route})=> ({
      tabBarShowLabel: false,
      headerShown: false,
      headerStyle: {
        backgroundColor: theme.sColor.primary
      }
    })}
    >
       
      {/* Screen HomeTab */}
    <Tab.Screen 
      name ='HomeTab'
      component ={HomeScreen}
      options={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: theme.color.secondary,
        tabBarIcon: ({color, size})=> (
          <Foundation name='home'color={color} size={40}></Foundation>
          )
        }} 
    />


    {/* Screen nuevo viaje */}
    <Tab.Screen 
      name ='NewTravel'
      component ={TestScreen}
      options={{
        tabBarInactiveTintColor: '#292262',
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
            <MaterialCommunityIcons name='airplane-plus'color={color} size={40}/>
            )
        }} 
        />  
    
    {/* Screen user  */}
    <Tab.Screen 
      name ='User'
      component ={TestScreen}
      options={{
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
          <FontAwesome name='user'color={theme.color.secondary} size={40}/>
          )
        }} 
        />  


        {/* Chat Screen  */}
   {/* <Tab.Screen 
      name ='Chat'
      component ={HomeScreen}
      options={{
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
          <Entypo name='direction'color={theme.color.secondary} size={40}/>
            )
          }} 
          />  */}
  
  </Tab.Navigator> 
       
          
  );

};


