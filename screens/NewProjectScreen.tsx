import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { ToastAndroid,StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {Text,View} from 'react-native'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import TagsInput from '../components/TagsInput';
import CreateNewProject from '../ApiRequests/newProject'
import newProject from "../ApiRequests/newProject";
import GlobalState from "../contexts/GlobalState";

export type IProjectType = {
  name:undefined|string,
  image:string|undefined,
  desc:undefined|string,
  tags:Array<string>
}


export default function NewTweetScreen() {
  const [project, setProject] = useState<IProjectType>({
    name:undefined,
    image:undefined,
    desc:undefined,
    tags:[],
  });
  const navigation = useNavigation();
  const [globalState,setGlobalState] = useContext(GlobalState);

 // React.useEffect(()=>{console.log("New project State: ",project)},[project]);

  const onPostTweet = () => {
    if(!project.name || !project.desc) {
      ToastAndroid.showWithGravityAndOffset(
        "Lol, add in the project name and desc dumbass",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return;
    }
    if(!project.image)
      setProject({...project,image:" "})
    const accessToken = globalState.tokens?.accessToken;
    if(!accessToken) {
      ToastAndroid.showWithGravityAndOffset(
        "New Project Failed to Publish as Access Tokens tokens failed to retrieve",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return;
    }
    console.log("accessToken for new project: ",accessToken);
    CreateNewProject(project,accessToken).then((backendRes)=>{
      console.log(`Posting the new project ${JSON.stringify(project)} `);
      console.log(`response of new project from backend: ${JSON.stringify(backendRes)}`);
    }).catch(err=>{
      ToastAndroid.showWithGravityAndOffset(
        "Oops ! failed to publish project :(",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      console.log(err)
    })
   
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
            value={project.name}
            onChangeText={(text)=>{setProject({...project,name:text})}}
            placeholderTextColor={'grey'}
            style={styles.imageInput}
            placeholder={"Enter your project name"}
          />
          <Text style={styles.formText}>Add A Image of your Project</Text>
          <TextInput
            value={project.image}
            onChangeText={(text)=>{setProject({...project,image:text})}}
            placeholderTextColor={'grey'}
            style={styles.imageInput}
            placeholder={"Image url (optional)`"}
          />
          <Text style={styles.formText}>Description</Text>
          <TextInput
            placeholderTextColor={'grey'}
            value={project.desc}
            textAlignVertical={'top'}
            onChangeText={(text) => {
              setProject({...project,desc:text});
            }}
            style={styles.tweetInput}
            multiline={true}
            numberOfLines={3}
            placeholder={"Add in a brief desc bout what your project is about"}
          />
          <Text>{"\n"}</Text>
          <Text style={styles.formTitle}>Tags</Text>
          <TagsInput project={project} setProject={setProject}/>
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
