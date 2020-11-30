import * as React from 'react';
import {StyleSheet,View,Text,SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function NewProjectScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
      <AntDesign name="arrowleft" size={32} color="white" />
      </SafeAreaView>
      <Text style={styles.title}>New Project</Text>
      <View style={styles.separator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.currentTheme.bgMain,
    borderColor:"white",
  },
  header:{
    backgroundColor:"red",
    width:"100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"white",
    height:100
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
