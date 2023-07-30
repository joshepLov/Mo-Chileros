import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font'

import { MaterialCommunityIcons, MaterialIcons,Foundation } from '@expo/vector-icons';
import { FontAwesome, Entypo} from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { LogInScreen } from '../screens/LogInScreen';
import { TestScreen } from '../screens/TestScreen';
import theme from '../utils/userThem';
import { AccountIndex } from '../screens/Account/AccountIndex';
import { RegisterScreen } from '../screens/Account/RegisterScreen';
import { CalendarTest } from '../Components/CalendarTest';
import { Hotel } from '../screens/Hotel/Hotel';
import { Transport } from '../screens/Transport/Transport';

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
      component ={Hotel}
      options={{
        tabBarInactiveTintColor: '#292262',
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
            <MaterialCommunityIcons name='airplane-plus'color={color} size={40}/>
            )
        }} 
        />  

    {/* {vista viaje actual} */}
    <Tab.Screen 
      name ='CurrentTravel'
      component ={CalendarTest}
      options={{
        tabBarInactiveTintColor: '#292262',
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
          <MaterialIcons name='map'color={color} size={40}/>
          )
        }} 
        /> 
    
    {/* Screen user  */}
    <Tab.Screen 
      name ='AccountIndex'
      component ={AccountIndex}
      options={{
        tabBarInactiveTintColor: '#292262',
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
          <FontAwesome name='user'color={color} size={40}/>
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


