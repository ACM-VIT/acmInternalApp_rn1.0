import React,{useState} from "react";
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from "react-native";

import EditScreenInfo from '../components/EditScreenInfo';



import * as Google from 'expo-google-app-auth'
import { androidClientId } from "../constants/Config";
import Colors from "../constants/Colors";


export default function TabTwoScreen() {

  return (
     <SafeAreaView style={styles.container}><Text>TabTwo</Text></SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgMain,
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
