import {StyleSheet} from 'react-native'
import {mainColor} from './index'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mainColor ,
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
      },
      tag: {
          backgroundColor: '#fff'
        },
      tagText: {
          color: mainColor
        },
  });

  export default styles;