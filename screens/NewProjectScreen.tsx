import * as React from 'react';
import { StyleSheet,View,Text } from 'react-native';

import Colors from '../constants/Colors';

export default function NewProjectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Project</Text>
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
