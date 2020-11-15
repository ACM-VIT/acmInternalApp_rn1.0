import React,{useState} from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

import EditScreenInfo from './EditScreenInfo';



import * as Google from 'expo-google-app-auth'
import { androidClientId } from "../constants/Config";
import Colors from "../constants/Colors";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GenericFunc } from "../global";

export type GoogleSignInParams = {
  handlePageChange:GenericFunc,
  googleSigninStatus:GenericFunc
}
export default function GoogleSignIn({handlePageChange,googleSigninStatus}:GoogleSignInParams) {
  const [googleSignin,setGoogleSignin] = useState({
    signedIn:false,
    name:"",
    photoUrl:"",
    accessToken:"",
  });

  const signIn:any = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        setGoogleSignin({
          signedIn: true,
          name: result.user.name ?  result.user.name :" ",
          photoUrl: result.user.photoUrl ? result.user.photoUrl:" ",
          accessToken:result.idToken? result.idToken:" "
        })
        console.log("idToken is accessToken: " + JSON.stringify(result));
        AsyncStorage.setItem('googleUser',JSON.stringify({...result.user,accessToken:result.idToken}));
      //  handlePageChange(1);
        googleSigninStatus(true);
        return result.idToken;
      } else {
        console.warn("error:cancelled");
        return { cancelled: true };
      }
    } catch (e) {
      console.warn("error");
      console.log(e);
      return { error: true };
    }
}
  return (
    <SafeAreaView style={styles.container}>
      {googleSignin.signedIn ? (
          <LoggedInPage name={googleSignin.name} photoUrl={googleSignin.photoUrl} />
        ) : (
          <><View style={styles.centerLabelContainer}>
          <Text style={styles.googleTitleLabel}>Acm Internal Ecosystem v1.0</Text>
        </View>
        <View style={styles.centerLabelContainer}>
          <Text style={styles.googleSubtitleLabel}>Onboarding... </Text>
        </View>
        <LoginPage signIn={signIn} />
        </>
         
        )}
    </SafeAreaView>
  );
}

export type LoginPageParams = {
  signIn:()=>any;
}

const LoginPage = (props:LoginPageParams) => {
  return (
    <View style={styles.loginPageContainer}>
      <TouchableOpacity onPress={props.signIn}>
        <View style={styles.googleBtn}  >
          <Text style={styles.btnLabel}> Google Sign in </Text>
        </View>
      </TouchableOpacity>
      
    </View>
  )
}

export type LoggedInParams = {
  name:string,
  photoUrl:string,
}

const LoggedInPage = (props:LoggedInParams) => {
  return (
    <View style={styles.LoggedInContainer}>
      <Image style={styles.image} source={{ uri: props.photoUrl }}/>
  <Text style={styles.header}>Welcome {'\n'}{ props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:200,
    backgroundColor: Colors.bgMain,
  },
  LoggedInContainer:{
    width:"100%",
    height:200,
    backgroundColor: Colors.bgMain,
    flexDirection:"row"
  },
  image: {
    marginTop: 15,
    marginLeft:10,
    marginRight:40,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  header: {
      fontSize: 25,
      color:"white",
      marginTop:50,
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
  googleBtn:{
    backgroundColor: "#202021",
    borderRadius:8,
    color:Colors.bgMain,
    width:'100%',
    paddingHorizontal:10,
    paddingVertical:10,
    justifyContent:"center"
  } ,
  loginPageContainer:{
    width:'100%',
    height:50,
    //backgroundColor:'red',
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    position:"absolute",
    bottom:15,
  },
  googleTitleLabel:{
    color:"white",
    alignSelf:"center",
    fontSize:28,
    fontWeight:"bold"
  },
  googleSubtitleLabel:{
    color:"grey",
    alignSelf:"flex-start",
    fontSize:17,
    fontStyle:"italic"
  },
  centerLabelContainer:{
    width:'100%',
    justifyContent:"center",
    alignContent:"center",
   // backgroundColor:"red",
    marginBottom:5,
    textAlign:"left",
    paddingHorizontal:15,
   
  },
  btnLabel:{
    color:"#9B9B9C",
    fontSize:10
  }
});
