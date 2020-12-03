import React,{useContext, useState} from "react";
import { StyleSheet, Text, View, Image} from "react-native";



import * as Google from 'expo-google-app-auth'
import { androidClientIdDev, androidClientIdProd, baseUrl, webClientId } from "../constants/Config";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GenericFunc } from "../global";
import GlobalState from "../contexts/GlobalState";

export type GoogleSignInParams = {
  handlePageChange:GenericFunc,
  googleSigninStatus:GenericFunc,
  setButtonPress:GenericFunc,
  buttonPress:boolean
}


export default function GoogleSignIn({buttonPress,setButtonPress,handlePageChange,googleSigninStatus}:GoogleSignInParams) {
  const [googleSignin,setGoogleSignin] = useState({
    signedIn:false,
    name:"",
    photoUrl:"",
    accessToken:"",
    email:"",
  });
  const [globalState,setGlobalState] = useContext(GlobalState);

  const signIn:any = async () => {
    try {
      const config = {
        expoClientId: webClientId,
         androidClientId: androidClientIdDev,
        androidStandaloneAppClientId: androidClientIdProd,
        scopes: ['profile', 'email'],
      }as Google.GoogleLogInConfig;
      const result = await Google.logInAsync(config);
      if (result.type === 'success') {
        setGoogleSignin({
          signedIn: true,
          name: result.user.name ?  result.user.name :" ",
          photoUrl: result.user.photoUrl ? result.user.photoUrl:" ",
          accessToken:result.idToken? result.idToken:" ",
          email: result.user.email? result.user.email:" "
        })
        console.log("idToken is accessToken: " + JSON.stringify(result));
        if(!result.user){
          console.log("no google user found");
          return;
        }
        
      //  handlePageChange(1);
        if(!result?.idToken) {
          console.log("error no idtoken in google response");
          console.warn("auth failed");
        }
        const loginReq = await fetch(`${baseUrl}/v1/access/login/google`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "authorization":`Bearer ${result.idToken}`,
            },
          }
        );
        const loginReponse = await loginReq.json();
        console.log(JSON.stringify(loginReponse));
        if(!loginReponse?.data?.tokens){
          console.log("could not get the tokens in the response google sigin custom");
          return;
        }
        console.log(loginReponse.data.tokens);
        const fcm_token = await AsyncStorage.getItem("fcm_token");
        if(!fcm_token){
          console.warn("error");
          throw new Error("No expo token")
        }
        const addNotificationTokenReq = await fetch(`${baseUrl}/v1/user/update`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${loginReponse.data.tokens.accessToken}`,
          },
          body:JSON.stringify({fcm_token})
        })
        const addNotificationTokenRes = await addNotificationTokenReq.json();
        console.log(JSON.stringify(addNotificationTokenRes));
        setGlobalState((globalState:any) => ({...globalState, googleUser: result.user,tokens:loginReponse.data.tokens,fcm_token}));
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
        {!buttonPress && <LoginPage setButtonPress={setButtonPress} signIn={signIn} />}
        </> 
        )}
    </SafeAreaView>
  );
}

export type LoginPageParams = {
  signIn:()=>any;
  setButtonPress:GenericFunc;
}

const LoginPage = (props:LoginPageParams) => {
  return (
    <View style={styles.loginPageContainer}>
      <TouchableOpacity onPress={()=>{props.setButtonPress(true);setTimeout(()=>props.signIn(),2500)}}>
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
    backgroundColor: Colors.currentTheme.onboarding.bgMain,
  },
  LoggedInContainer:{
    width:"100%",
    height:200,
    backgroundColor: Colors.currentTheme.onboarding.bgMain,
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
    color:Colors.currentTheme.onboarding.bgMain,
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
