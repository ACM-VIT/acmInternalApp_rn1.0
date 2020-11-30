import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import NewTweetButton from '../components/NewTweetButton';

import Colors from '../constants/Colors';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
     <Feed />
     <NewTweetButton/>
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
