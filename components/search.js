import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
var teams = ['red', 'blue', 'green', 'yellow'];
export default class Look extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> SEARCH </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
  },
  button: {
    width: 200,
    height: 50,
  },
});
