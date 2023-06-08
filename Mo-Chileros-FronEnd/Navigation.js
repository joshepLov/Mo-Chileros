import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import { HomeScreen } from './src/screens/HomeScreen';
import { LogInScreen } from './src/screens/LogInScreen';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  
  );
};



export const Navigation = () => {
  return (
    <NavigationContainer>
        <MyStack></MyStack>
    </NavigationContainer>
  )
}
