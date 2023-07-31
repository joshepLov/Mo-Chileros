import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font'
import { AuthContext } from '../../App';

import { MaterialCommunityIcons, MaterialIcons,Foundation } from '@expo/vector-icons';
import { FontAwesome5 ,FontAwesome, Entypo} from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { LogInScreen } from '../screens/LogInScreen';
import { TestScreen } from '../screens/TestScreen';
import theme from '../utils/userThem';
import { AccountIndex } from '../screens/Account/AccountIndex';
import { RegisterScreen } from '../screens/Account/RegisterScreen';
import { CalendarTest } from '../Components/CalendarTest';
import { Hotel } from '../screens/Hotel/Hotel';
import { Transport } from '../screens/Transport/Transport';
import { GetTravel } from '../screens/Travel/GetTravell';
import { CardRoute } from '../Components/CardRoute';

const Tab = createBottomTabNavigator()
// const Stack = createNativeStackNavigator();

export default MyTabs = () => {
 
  const {loggedIn, dataUser} = useContext(AuthContext)

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


   {
    loggedIn == true? (
    <Tab.Screen 
      name ='Travel'
      component ={GetTravel}
      options={{
        tabBarInactiveTintColor: '#292262',
        tabBarActiveTintColor: 'green',
        tabBarIcon: ({color, size})=> (
          <MaterialIcons name='map'color={color} size={40}/>
          )
        }} 
        /> 

    ):(<></>)
   }

   {
    dataUser.role == 'ADMIN' || dataUser.role == 'MODERADOR'?  (
      <>
       <Tab.Screen 
        name ='f'
        component ={Transport}
         options={{
          tabBarInactiveTintColor: '#292262',
          tabBarActiveTintColor: 'green',
          tabBarIcon: ({color, size})=> (
            <FontAwesome5 name='car-side'color={color} size={40}/>
            )
        }} 
        />

        <Tab.Screen 
          name ='A'
          component ={Hotel}
              options={{
                tabBarInactiveTintColor: '#292262',
                tabBarActiveTintColor: 'green',
                tabBarIcon: ({color, size})=> (
                  <FontAwesome5 name="hotel" size={30} color={color} />
                  )
                }} 
        />
      </>
    ):(<></>)
   }
  
    
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


