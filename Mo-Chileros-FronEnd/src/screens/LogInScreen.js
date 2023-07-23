import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import axios from 'axios';
import { HomeScreen } from './HomeScreen';
export const LogInScreen = ({navigation}) => {

    const [log, setLog] = useState({
        username: '',
        password: ''
      });
    
      const handleChange = (name, value) => {
        setLog( ({
          ...log,
          [name]: value
        }));
      };
    
      const login = async () => {
        try {
          const response = await axios.post('http://192.168.1.9:3418/user/login', log);
          const data = response.data;
          console.log(data, "23");
    
          if (data.message) {
            alert(data.message);
            navigation.navigate('Home')
          }
        } catch (e) {
          console.log(e);
          return ('Error al iniciar sesión');
        }
      };
     
  return (
    <View style={styles.mainContainer}>
        <View>
            <Text> WELCOME TO MOCHILEROS</Text>
            <Text>SIG IN TO YOUR ACCOUNT</Text>
            <TextInput placeholder='username'name='username' onChangeText={value => handleChange("username", value)} ></TextInput>
            <TextInput placeholder='password' name='password' onChangeText={value => handleChange("password", value)}></TextInput>
            <Button title='log in'onPress={()=>login()}/>
        </View>
    </View>
    )
}

const styles =StyleSheet.create({
    mainContainer:{flex:1, alignContent:'center', marginTop:60}
})