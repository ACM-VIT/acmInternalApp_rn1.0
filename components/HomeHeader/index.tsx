import React, { useRef } from 'react';
import { View,Text,StyleSheet} from 'react-native';
import assets from '../../constants/assets';
import ProfilePicture from '../ProfileComponent';
import SearchBarContainer from './SearchBar'

const HomeHeader = ()=>{
  
   
    return(
        <View style={styles.container}>
            <ProfilePicture image={assets.acmLogo} />
          <SearchBarContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:60,
        //backgroundColor:"red",
        justifyContent:"flex-start",
        paddingHorizontal:10,
        alignItems:"center",
        marginTop:10,
        flexDirection:"row"
    }
});

export default HomeHeader;