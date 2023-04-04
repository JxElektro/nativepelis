// create a test component in a typescript format

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function test() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Path: src\config\theme.ts