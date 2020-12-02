import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {Text,View} from 'react-native'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import TagsInput from '../components/TagsInput'
export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigation = useNavigation();

  const onPostTweet = () => {
    console.log(`Posting the new tweet ${tweet} 
      with image ${imageUrl}`);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate("Root")} >
        <AntDesign name="close" size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPostTweet} style={styles.button}>
          <Text style={styles.buttonText}>Publish Project</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.inputsContainer}>
           <Text>{"\n"}</Text>
          <Text style={styles.formTitle}>New Project </Text>
          <Text style={styles.formText}>Project name</Text>
          <TextInput
            placeholderTextColor={'grey'}
            style={styles.imageInput}
            placeholder={"Enter your project name"}
          />
          <Text style={styles.formText}>Add A Image of your Project</Text>
          <TextInput
            placeholderTextColor={'grey'}
            style={styles.imageInput}
            placeholder={"Image url (optional)`"}
          />
          <Text style={styles.formText}>Description</Text>
          <TextInput
            placeholderTextColor={'grey'}
            value={tweet}
            textAlignVertical={'top'}
            onChangeText={(text) => {
              setTweet(text);
            }}
            style={styles.tweetInput}
            multiline={true}
            numberOfLines={3}
            placeholder={"Add in a brief desc bout what your project is about"}
          />
          <Text>{"\n"}</Text>
          <Text style={styles.formTitle}>Tags</Text>
          <TagsInput/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: Colors.currentTheme.bgMain,
  },
  headerContainer: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  tweetInputContainer: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputsContainer: {
    marginLeft: 10,
    //backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  tweetInput: {
    color: "white",
  },
  imageInput: {
    color:"white"
  },
  button: {
    backgroundColor: Colors.currentTheme.primaryButtonColor,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
  },
  formText:{
    color:"white",
  },
  formTitle:{
    fontSize:32,
    color:"white",
    marginBottom:13,
  },
});
