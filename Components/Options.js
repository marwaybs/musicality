import React, { Component } from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import tick from './../Sounds/click1.wav';
import tock from './../Sounds/click2.wav';

export default class Metronome extends Component {
  constructor(props){
    super(props);
    this.tick = new Sound(tick);
    this.tock = new Sound(tock);
    this.state = {
      difficulty: 1,
    };
  }

  render() {
    const {} = this.state;
    return (
      <View style={styles.container}>
        <Text>Difficulty:</Text>
        {/* Multiselect for 3 types of difficulty */}
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
