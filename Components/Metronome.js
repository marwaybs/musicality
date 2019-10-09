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
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
      bars: 4,
      bar: 0,
      nextPress: 1,
      correct: false,
      score: 0,
      pressTimeFrame: null, 
    };
  }


  _togglePlay() {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          bar: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  setNextPress() {
    this.setState({
      pressTimeFrame: performance.now(),
      nextPress: 1,
    })
  }

  _checkPress() {
    const {bar, count, beatsPerMeasure, nextPress, pressTimeFrame} = this.state;
    // have to find the 1 beat before 
    const currentBeat = bar * beatsPerMeasure + count;
    this.setState({correct: currentBeat === nextPress ? true : false });
    const points = performance.now - pressTimeFrame;
    this.setState({score: points});

    // Wait for half a beat then have a full beat to press
    // calculate score based on how on the beat it is
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
  
    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.tick.play();
    } else {
      this.tock.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure,
      bar: (state.count === 0 ? state.bar + 1 : state.bar) % state.bars,
    }));
  };

  _handleBpmChange (bpm) {                    
    if (this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bar: 0,
        bpm: bpm,
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  };

  render() {
    const {bpm, count, bar, beatsPerMeasure, correct, score} = this.state;
    return (
      <View style={styles.container}>
        <Text>bpm: {bpm}</Text>
        <Text>count: {count}</Text>
        <Text>bar: {bar}</Text>
        <Text>beats per measure: {beatsPerMeasure}</Text>
        <Text>correct: {correct ? ":)" : ":("}</Text>
        <Text>Score: {score}</Text>


        <Button
            style={{fontSize: 20, color: 'green'}}
            styleDisabled={{color: 'red'}}
            onPress={() => this._togglePlay()}
            title={this.state.playing ? "stop" : "start"}
          >
        </Button>
        <Button
            style={{fontSize: 20, color: 'green'}}
            styleDisabled={{color: 'red'}}
            onPress={() => this._checkPress()}
            title="Press"
          >
        </Button>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor="#FFFFFF"
          click="#000000"
          value={this.state.bpm}
          step={1}
          onValueChange={value => this._handleBpmChange(value)}
        />
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
