var formatTime = require("minutes-seconds-milliseconds");
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  AppRegistry
} from "react-native";

var StopWatch = React.createClass({

  getInitialState: function(){
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function(){
    return <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.timerWrapper}>
              <Text style={styles.timer}>
                {formatTime(this.state.timeElapsed)}
              </Text>
            </View>
            <View style={styles.buttonWrapper}>
              {this.startStopButton()}
              {this.lapButton()}
            </View>
              </View>
              <ScrollView style={styles.footer}>
                {this.laps()}
                {this.resetButton()}
              </ScrollView>
          </View>
  },
  resetButton: function() {
    return <TouchableHighlight
    underlayColor="gray"
    style={[styles.resetButton]}
    onPress={this.handleResetPress}>
      <Text style={styles.resetText}>
        Reset
      </Text>
    </TouchableHighlight>
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap#{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      style={[styles.button, style]}
      onPress={this.handleStartPress}>
      <Text style={styles.buttonText}>
        {this.state.running ? "Stop" : "Start"}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function() {
    return <TouchableHighlight
    underlayColor="gray"
    style={[styles.button, styles.lapButton]}
    onPress={this.handleLapPress}>
      <Text style={styles.buttonText}>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });

  },
  handleResetPress: function(){
    this.setState({
      startTime : new Date(),
      timeElapsed: null,
      laps: []
    });
  },
  handleStartPress: function(){
    if(this.state.running){
    clearInterval(this.interval);
    this.setState({running:false});
    return
    }

    this.setState({startTime : new Date()});

    this.interval = setInterval(() => {
      this.setState ({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 100);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  header: {
    flex: 1,
    backgroundColor: "#2EC2AC"
  },
  footer: {
    flex: 1
  },
  timerWrapper:{
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20
  },
  timer: {
    fontSize: 60,
    color: "#FFFFFF",
    fontWeight: "500"
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  buttonText: {
    color: "#2EC2AC",
    fontSize: 26,
    fontWeight: "700"
  },
  startButton: {
    borderColor: "#FFFFFF"
  },
  stopButton: {
    borderColor: "#CC0000"
  },
  lapButton: {
    borderColor: "#FFFFFF"
  },
  lap: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  lapText: {
    fontSize: 30,
    color: "#2EC2AC"
  },
  resetButton: {
    height:40,
    marginTop: 10,
    marginBottom: 10
  },
  resetText: {
    fontSize: 30,
    color: "red",
    alignSelf: 'stretch',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent("stopwatch", () => StopWatch);
