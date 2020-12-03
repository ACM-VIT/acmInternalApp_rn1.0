import React, { useRef } from 'react';
import { View,Text,StyleSheet} from 'react-native';

import {SearchBar} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';

import { AntDesign } from '@expo/vector-icons';


const SearchBarContainer = ()=>{
    const [query,setQuery] = React.useState("");
    return(
        <View style={styles.container}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon}/>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => setQuery(queryText)}
          placeholder="Search"
          placeholderTextColor={ Colors.currentTheme.primaryButtonColor}
          style={styles.searchBar}
        />

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.currentTheme.searchBackground,
        flexDirection:"row",
        alignItems:"center",
        height:60,
        width:"81%",
        marginTop:10,
        marginLeft:8,
        borderRadius:8,
        paddingLeft:8,
    },
    searchBar:{
        backgroundColor:Colors.currentTheme.searchBackground,
        width:"82%",
        borderRadius:8,
        fontSize:20,
        color:Colors.currentTheme.primaryButtonColor,
    },
    searchIcon: {
        marginRight:8,
        //color:Colors.currentTheme.primaryButtonColor,
    }
});

export default SearchBarContainer;