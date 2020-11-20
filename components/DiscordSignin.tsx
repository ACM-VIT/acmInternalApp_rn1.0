import * as AuthSession from "expo-auth-session";
import * as React from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { baseUrl, discordApi, discordClientId, discordClientSecret, discordOauthLink } from "../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GenericFunc } from "../global";



const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export type DiscordSigninParams = {
    setDiscordSignin:GenericFunc,
    discordSigninStatus:GenericFunc 
}

export default function DiscordSignin({setDiscordSignin,discordSigninStatus}:DiscordSigninParams) {
  const [name, setName] = React.useState(null);

  const handleLogin = async () => {
    const response = await AuthSession.startAsync({
      authUrl: discordOauthLink,
    });
    //@ts-ignore
    if(!response.params.code) {
      console.log("Auth Failed. Curse the devs");
      return;
    }
   // @ts-ignore
    console.log(response.params.code);
    const data = new FormData();
    data.append('client_id',discordClientId);
    data.append('client_secret',discordClientSecret);
    data.append('grant_type','authorization_code');
      //@ts-ignore
    data.append('code',response.params.code);
    data.append('redirect_uri',redirectUri);
    data.append('scope','identify email guilds');
    console.log(data);

    const accessTokenRequest = await fetch(`${discordApi}/oauth2/token`,{
      method:'POST',
      body:data,
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    const accessTokenResponse = await accessTokenRequest.json();
    console.log("acessTOkenDiscord" + JSON.stringify(accessTokenResponse));
    if(!accessTokenResponse.access_token)
     console.log("error in accesstoken");
    const userRequest = await fetch(`${discordApi}/users/@me`,{
      headers:{
        'Authorization': `Bearer ${accessTokenResponse.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded" 
      }
    })
    const user = await userRequest.json();
    let tokensStorage:string|null = await AsyncStorage.getItem("tokens");
    if(!tokensStorage){
      console.log("coudn not get the custom tokens from async storage");
      return ;
    } 
    let tokens = JSON.parse(tokensStorage);
    console.log(tokens);
    if(!tokens?.accessToken) {
      console.warn("error in getting tokens");
      return;
    }
    const addDiscordReq = await fetch(`${baseUrl}/v1/access/login/discord`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        'Authorization': `Bearer ${tokens.accessToken}`,
        'discord_token': `Bearer ${accessTokenResponse.access_token}`,
      }
    })
    const addDiscordRes = await addDiscordReq.json();
    console.log(addDiscordRes);
    console.log(user);
    if(!user) {
      console.warn("Auth failed");
      console.log("Auth failed");
    }
    console.log(response);
    await AsyncStorage.setItem('discord_user',JSON.stringify(user));
    setDiscordSignin({
      signedIn:true,
      username:user.username,
    });
    discordSigninStatus(true);
}

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

 

  return (
    <View style={styles.container}>
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <View style={styles.button}>
            <Button
          title="Discord Login"
          onPress={() => handleLogin()}
        />
        </View>      
      )}
    </View>
  );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgMain,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  button:{
    marginHorizontal:15
  }
});