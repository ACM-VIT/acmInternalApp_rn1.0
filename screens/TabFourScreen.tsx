import * as React from 'react';
import { StyleSheet,View,Text } from 'react-native';

import Colors from '../constants/Colors';

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} />
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
