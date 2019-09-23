import React, { Component } from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';

export default class Metronome extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {score} = this.props;
    return (
      <View style={styles.container}>
        <Text>Score: {score} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
