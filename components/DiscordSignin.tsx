import React from 'react'
import {View,Button, StyleSheet, Text} from 'react-native'
import { authorize } from 'react-native-app-auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { discordClientId, discordClientSecret, discordOauthLink } from '../constants/Config'
import * as WebBrowser from 'expo-web-browser';
const config = {
  clientId: discordClientId,
  clientSecret: discordClientSecret,
  redirectUrl: 'http://localhost:53134/',
  scopes: ['email', 'identify'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
    tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
    revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke'
  }
}
async function  _onLoginDiscord() {
  try {
    WebBrowser.openBrowserAsync(discordOauthLink);
  } catch (error) {
    console.log(error);
  }
}



export default function DiscordSignin() {
  return(
    <SafeAreaView style={styles.discordContainer}>
      <TouchableOpacity onPress={_onLoginDiscord}>
      <View style={styles.discordLoginBtn}>
          <Text style={styles.discordLoginBtnLabel}>Discord Signin</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles =  StyleSheet.create({
  discordContainer:{

  },
  discordLoginBtn:{

  },
  discordLoginBtnLabel:{

  }
});

