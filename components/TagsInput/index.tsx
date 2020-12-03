import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
 
import TagInput from 'react-native-tags-input';
import Colors from '../../constants/Colors' 
const mainColor = Colors.currentTheme.bgMain;

type props = {};
type state = {
    tags: {
      tag: string,
      tagsArray: string[]
    },
    tagsColor: string,
    tagsText:string,
}
 
export default class App extends React.Component<props,state> {
  constructor(props:any) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: mainColor,
      tagsText: '#fff',
    };
  }
  
  updateTagState = (state:any) => {
      this.setState({
        tags: state
      })
    };
 
  render() {
    return (
      <View style={styles.container}>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."                            
          label='Press comma & space to add a tag'
          labelStyle={{color: '#fff'}}
         // leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: (Dimensions.get('window').width - 40)}}
          inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
          inputStyle={{color: this.state.tagsText}}
          onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
          onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={', '}/>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: mainColor,
    marginLeft:0,
    borderRadius:8,
  },
  textInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginVertical: 8,
      borderRadius: 5,
      padding: 3,
    },
    tag: {
        backgroundColor: Colors.currentTheme.tagsColor,
        borderColor:Colors.currentTheme.primaryButtonColor
      },
    tagText: {
        color: Colors.currentTheme.tagsTextColor
      },
});