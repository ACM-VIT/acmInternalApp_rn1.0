import React, { Component } from 'react';
import {
  Dimensions,
  View
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './styles'
 
import TagInput from 'react-native-tags-input';
export const mainColor:string = '#3ca897';

type MyProps = { };
type MyState = {
    tags: {
    tag: string,
    tagsArray: string[]
  }, 
   tagsColor: string,
  tagsText: string, 
};
 
export default class App extends React.Component<MyProps,MyState> {
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
          leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
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
 
