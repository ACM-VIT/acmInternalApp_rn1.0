import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feed from '../components/Feed';
import HomeHeader from '../components/HomeHeader';
import NewProjectButton from '../components/NewProjectButton';

import Colors from '../constants/Colors';
import GlobalState, { IGlobalState } from '../contexts/GlobalState';
import { UserType } from '../global';

export default function HomeScreen() {
  const [user,setUser] = React.useState<UserType>({
    name:"",
    username:"",
    profilePic:"", 
  });
  const [globalState,setGlobalState] = React.useContext(GlobalState);
  React.useEffect(()=>{
    AsyncStorage.getItem("globalState").then((gs)=>{
      if(gs) {
        console.log("globalStorage updated from mem",gs);
        setGlobalState(JSON.parse(gs)as IGlobalState)
      }else{
        console.log("new user set into mem:",globalState);
        AsyncStorage.setItem("globalState",JSON.stringify(globalState));
      };
    }).catch((err)=>console.log("err in globalStorage fetch from memory ",err));
    if(globalState.googleUser && globalState.discordUser)
      setUser({name:globalState.googleUser.name || " ",username:globalState.discordUser.username || " ",profilePic:globalState.googleUser.photoUrl || " "})
  },[]);

  React.useEffect(() => {
    console.log("UserINfo: ",user);
  }, [user])
  return (
    <SafeAreaView style={styles.container}>
     <HomeHeader/>
     <Feed />
     <NewProjectButton/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.currentTheme.bgMain,
    marginTop:StatusBar.currentHeight
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
});
