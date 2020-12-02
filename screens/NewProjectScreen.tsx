import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {Text,View} from 'react-native'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePicture from "../components/ProfileComponent";
import tweets from "../fetchRequests/feed";
import {useNavigation} from '@react-navigation/native'

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
      <TouchableOpacity onPress={()=>navigation.navigate("Root")} style={styles.button}>
        <AntDesign name="close" size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPostTweet} style={styles.button}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetInputContainer}>
        <ProfilePicture image={tweets[0].user.profilePic} size={70} />
        <View style={styles.inputsContainer}>
          <TextInput
            placeholderTextColor={'lightgrey'}
            value={tweet}
            onChangeText={(text) => {
              setTweet(text);
            }}
            style={styles.tweetInput}
            multiline={true}
            numberOfLines={2}
            placeholder={"What's happening ?"}
          />
          <TextInput
            placeholderTextColor={'lightgrey'}
            style={styles.imageInput}
            placeholder={"Image url (optional)`"}
          />
        </View>
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
});
