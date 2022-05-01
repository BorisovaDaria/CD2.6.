import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [token, setToken] = useState(null)

 const onSubmit = async() => {
        await AsyncStorage.setItem('token', username)
        if (username === 'anthony' && password === '123456' || username === 'dasha' && password === '34502') {
            console.log('OK')
            navigation.navigate('Main')
            
        }else {
            console.log('Not OK')
            navigation.navigate('login')
        }
    }

    const tokenlogin = async() => {
        const value = await AsyncStorage.getItem('token')
        console.log(value)
        //if (value !== null) {
          //  navigation.navigate('Main')
          //  console.log('Connected')
       // }else {
         //   console.log('No connected')
       // }
    }

    tokenlogin()

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:("https://i.pinimg.com/originals/b4/4c/66/b44c665c88d2d14d1b4a6904bd133acb.gif")}} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="User Name "
          placeholderTextColor="#F2F6F7"
          onChangeText={(value) => setUsername(value)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#F2F6F7"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#186e7d",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    zIndex:1,
    width:350,
    height:240,
    resizeMode:"conteain"
  },
 
  inputView: {
    backgroundColor: "#0AD0D6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    bottom:410,
    marginBottom: 20,
    alignItems: "flex-start",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems:'center',
    alignText:'center'
  },
 
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#09B2B8",
    bottom:29
  },
});