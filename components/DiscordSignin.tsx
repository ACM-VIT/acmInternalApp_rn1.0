import * as AuthSession from "expo-auth-session";
import * as React from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { baseUrl, discordApi, discordClientId, discordClientSecret, discordOauthLink } from "../constants/Config";
import { GenericFunc } from "../global";
import GlobalState, { IGlobalState } from "../contexts/GlobalState";
import {Bubbles} from 'react-native-loader';



const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export type DiscordSigninParams = {
    setDiscordSignin:GenericFunc,
    discordSigninStatus:GenericFunc 
}
export type LoginParams = {
  // tokens:{
  //   accessToken:string,
  //   refreshToken:string
  // },
  globalState:IGlobalState,
  setDiscordSignin:GenericFunc,
  setGlobalState:GenericFunc,
  discordSigninStatus:GenericFunc
}
const handleLogin = async ({globalState,setDiscordSignin,setGlobalState,discordSigninStatus}:LoginParams) => {
  console.log("inside function: ",globalState);
  const response = await AuthSession.startAsync({
    authUrl: discordOauthLink,
  });
  //@ts-ignore
  if(!response.params.code) {
    console.log("Auth Failed. Curse the devs");
    return;
  }
  const data = new FormData();
  data.append('client_id',discordClientId);
  data.append('client_secret',discordClientSecret);
  data.append('grant_type','authorization_code');
    //@ts-ignore
  data.append('code',response.params.code);
  data.append('redirect_uri',redirectUri);
  data.append('scope','identify email guilds');

  const accessTokenRequest = await fetch(`${discordApi}/oauth2/token`,{
    method:'POST',
    body:data,
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  })
  const accessTokenResponse = await accessTokenRequest.json();
  if(!accessTokenResponse.access_token)
   console.log("error in accesstoken");
  const userRequest = await fetch(`${discordApi}/users/@me`,{
    headers:{
      'Authorization': `Bearer ${accessTokenResponse.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded" 
    }
  })
  const user = await userRequest.json();
  console.log("the tokens y1: ",globalState.tokens);
  if(!globalState.tokens) {
    console.log("nope,gess nt error beep boop",globalState.tokens);
    return;
  }
  const addDiscordReq = await fetch(`${baseUrl}/v1/access/login/discord`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      'Authorization': `Bearer ${globalState.tokens.accessToken}`,
      'discord_token': `Bearer ${accessTokenResponse.access_token}`,
    }
  })
  const addDiscordRes = await addDiscordReq.json();
  if(!user) {
    console.warn("Auth failed");
    console.log("Auth failed");
  }
  setDiscordSignin({
    signedIn:true,
    username:user.username,
  });
  discordSigninStatus(true);
  setGlobalState((globalState:any) => ({...globalState, discordUser:user}));
}

interface tokens  {
  accessToken:string,
  refreshToken:string,
}

export default function DiscordSignin({setDiscordSignin,discordSigninStatus}:DiscordSigninParams) {
  const [name, setName] = React.useState(null);
  const [globalState,setGlobalState] = React.useContext(GlobalState);
  const [tokens,setTokens] = React.useState<tokens>({accessToken:"",refreshToken:""});
React.useEffect(()=>{
},[])
  
  return (
    <View style={styles.container}>
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <View style={styles.button}>
          {globalState.tokens ? <Button
          title="Discord Login"
          onPress={() =>{handleLogin({globalState,setDiscordSignin,setGlobalState,discordSigninStatus})}}
        />:     <View style={styles.bars}>
          <Bubbles size={7} color="#FFFFFF" /> 
      </View>}
        </View>      
      )}
    </View>
  );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.currentTheme.bgMain,
    // backgroundColor:"red",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  button:{
    marginHorizontal:10,
  },
  bars:{
    alignItems:"center",
  }
});