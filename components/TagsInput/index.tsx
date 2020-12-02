
import React from "react";
import { TouchableOpacity, Text,View,StyleSheet } from "react-native";
import TagInput from 'react-native-tag-input';
import Colors from "../../constants/Colors";
 

const MyTagInput = () => {
  const [tags,setTags] = React.useState<Array<string>>([]);
  const [text,setText] = React.useState<string>(" ");
  return <TagInput
  value={tags}
  onChange={(tag:string) => setTags([...tags,tag])}
  labelExtractor={(email:string) => email}
  text={text}
  onChangeText={(textInput:string) => setText(text)}
/>
};
export default MyTagInput;

const styles = StyleSheet.create({
  tags:{
    backgroundColor:Colors.currentTheme.postBackgroundColor,
    borderRadius:10,
    paddingVertical:5,
    paddingHorizontal:14,
    marginRight:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tagsText:{
    color:"#fff",
  },
});
