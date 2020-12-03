import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import NewProjectButton from '../components/NewProjectButton';

import Colors from '../constants/Colors';
import GlobalState, { IGlobalState } from '../contexts/GlobalState';

export default function HomeScreen() {
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
  },[]);
  return (
    <View style={styles.container}>
     <Feed />
     <NewProjectButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.currentTheme.bgMain
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
