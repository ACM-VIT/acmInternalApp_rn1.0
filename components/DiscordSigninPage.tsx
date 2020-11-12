import React, { useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import { GenericFunc } from '../global';
import DiscordSignin from './DiscordSignin';


export type DiscordSigninPageParams = {
    setOnboarding:GenericFunc,
    handlePageChange:GenericFunc,
    discordSigninStatus:GenericFunc
}

export type setDiscordSignInParams = {
    setDiscordSignin:GenericFunc
    discordSigninStatus:GenericFunc
}


export default function DiscordSigninPage({discordSigninStatus}:DiscordSigninPageParams) {
    const [discordSignin,setDiscordSignin] = useState({
        signedIn:false,
        username:" "
    })
    return(<View style={styles.mainContainer}>
     {discordSignin.signedIn ? <DiscordLoggedinComp discordSignin={discordSignin} discordSigninStatus={discordSigninStatus}  />:<DiscordLoginComp discordSigninStatus={discordSigninStatus} setDiscordSignin={setDiscordSignin}/>}
    </View>)
}


export function DiscordLoginComp({setDiscordSignin,discordSigninStatus}:setDiscordSignInParams) {
    return(
        <View style={styles.mainContainer}>
        <Text style={styles.title}>Step 2: Connect Your Discord Account</Text>
          <DiscordSignin setDiscordSignin={setDiscordSignin} discordSigninStatus={discordSigninStatus}/>
        </View>
    )
}
export function DiscordLoggedinComp({discordSignin}:any) {
    return(
        <View style={styles.mainContainer}>
            <Text style={{color:"#fff",fontSize:32,marginHorizontal:25,marginTop:20}}>Sucessfull Login {"\n"}@{discordSignin.username}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer:{
        width:"100%",
        height:150,
        backgroundColor:Colors.bgMain,
    },
    title:{
        fontSize:32,
        color:"#fff",
        marginBottom:20,
        marginHorizontal:20
    }
});

