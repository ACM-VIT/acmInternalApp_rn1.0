import React,{useState} from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';



import * as Google from 'expo-google-app-auth'
import { androidClientId } from "../constants/Config";
import DiscordSignin from "../components/DiscordSignin";

export default function TabTwoScreen() {

  return (
     <DiscordSignin/>
  );
}

export type LoginPageParams = {
  signIn:()=>any;
}

const LoginPage = (props:LoginPageParams) => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" 
       onPress={() => props.signIn()} />
    </View>
  )
}

export type LoggedInParams = {
  name:string,
  photoUrl:string,
}

const LoggedInPage = (props:LoggedInParams) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  header: {
      fontSize: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
