import * as React from 'react';
import { StyleSheet,View,Text,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalState, { IGlobalState } from '../contexts/GlobalState';


import Colors from '../constants/Colors';
import ProfilePicture from '../components/ProfileComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GenericFunc} from '../global'
import ViewPager from '@react-native-community/viewpager';

const InfoScreen = () => (
  <View key="1" style={[styles.tabView, { backgroundColor: '#ff4081' }]} />
);
 
const SettingScreen = () => (
  <View key="2" style={[styles.tabView, { backgroundColor: '#673ab7' }]} />
);


interface ITabProps {
  name:string;
  tab_num:number;
  setTab:GenericFunc;
  curr_tab:number;
}

const Tab = ({curr_tab,setTab,name,tab_num}:ITabProps) => (
  <TouchableOpacity onPress={setTab(curr_tab)}>
      <View style={curr_tab===tab_num?styles.activeTab:styles.inactiveTab}>
    <Text style={curr_tab===tab_num?styles.activeTab_Text:styles.inactiveTab_Text}>{name}</Text>
    </View >
 </TouchableOpacity>
)
 


export default function ProfileScreen() {
  const [globalState,setGlobalState] = React.useContext(GlobalState);
  const [tab, setTab] = React.useState(1);
  const pagerRef = React.useRef<ViewPager>(null);
  React.useEffect(()=>{
    console.log(globalState)
  });

  const handlePageChange = (pageNumber:number) => {
    if(pagerRef.current)
      pagerRef.current.setPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.bgEle} />
        <View style={styles.pp_container}>
              <ProfilePicture image={globalState.googleUser.photoUrl} size={95}/>
        </View>
      </View>
      <View style={styles.information_container}>
          <View style={styles.person_info}>
              <Text style={styles.department}>Web</Text>
              <Text style={styles.name}>{globalState.googleUser.name.replace(" ","\n")}</Text>
              <View style={styles.designEle}/>
          </View>
          <View style={styles.person_bio}>
            <Text style={styles.bio_main}>Core Memember since 2019</Text>
            <Text style={styles.bio_subtitle}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum sapiente tempore, debitis dolorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, eaque. </Text>
          </View>
      </View>
      <View style={styles.tabView}>
        <View style={styles.tabs}>
          <Text>Info</Text>
          <Text>Settings</Text>
        </View>
        <View style={styles.tab_screen}>
          <ViewPager style={{ flex: 1 }} ref={pagerRef}>
              <InfoScreen />
              <SettingScreen />
          </ViewPager>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.currentTheme.bgMain,
    flexDirection:"column"
  },
  information_container:{
    height:'30%',
    width:'100%',
    //backgroundColor:'red'
    // borderWidth:1,
    // borderColor:"red",
    flexDirection:"row",
    alignItems:"center",
  },  
  header:{
    width:'100%',
    height:'27%',
   // backgroundColor:'red'
     marginBottom:20,
  },
  bgEle: {
    width:'100%',
    height:'95%',
    backgroundColor:"#284B5A",
    borderBottomRightRadius:100,
  },
  pp_container: {
    position:"relative",
    top:-55,
    left:25,
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
  person_info: {
    height:'100%',
    // borderColor:'green',
    // borderWidth:1,
    paddingHorizontal:30,
    paddingVertical:50,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  person_bio:{
    height:'85%',
    width:'100%',
    borderWidth:1,
    // borderColor:'purple',
    backgroundColor:'#293140',
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    padding:15,
    flexDirection:'column',
    flexShrink:1,
  },
  department:{
    fontSize:12,
    color:"#AEAEAE",
    fontWeight:"400",
  },
  name:{
    fontSize:24,
    color:'#fff',
    fontWeight:"700",
    marginTop:13,
  },
  designEle:{
    width:86,
    height:6,
    backgroundColor:'#1AA9E4',
    marginTop:8,
  },
  bio_main :{
    color:"#fff",
    marginBottom:20,
  },
  bio_subtitle:{
    color:"#fff",
    lineHeight:15,
    flexShrink:1,
    fontSize:13
  },
  inactiveTab_Text:{
    color:"#828282",
    fontSize:20,
  },
  activeTab_Text:{
    color:"#2D9CDB",
    fontSize:20,
  },
  activeTab:{
    borderBottomWidth:2,
    borderBottomColor:"#2D9CDB",
    width:'50%',
    alignItems:'center',
    paddingHorizontal:20,
  },
  inactiveTab:{
    borderBottomWidth:0,
    width:'50%',
    alignItems:'center',
    paddingHorizontal:20,
  },
  tabView:{
    flex:1,
  },
  tabs:{
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    paddingHorizontal:30
  },
  tab_screen:{
    flex:1,
  }
});
