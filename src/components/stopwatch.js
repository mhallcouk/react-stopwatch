var formatTime = require("minutes-seconds-milliseconds");
import React, {Component} from "react";

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };

    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleResetPress = this.handleResetPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.laps = this.laps.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
    this.lapButton = this.lapButton.bind(this);
  }



  resetButton(){
    return <button
    id="resetButton"
    onClick={this.handleResetPress}>
      <p id="resetText">
        Reset
      </p>
    </button>
  }

  laps(){
    return this.state.laps.map(function(time, index){
      return <div id="lap">
        <div id="lapText">
          Lap#{index + 1}
        </div>
        <div id="lapText">
          {formatTime(time)}
        </div>
      </div>
    });
  }

  startStopButton() {
    // var style = this.state.running ? styles.stopButton : styles.startButton;

    return <button
      id="button"
      onClick={this.handleStartPress}>
      <div id="buttonText">
        {this.state.running ? "Stop" : "Start"}
      </div>
    </button>
  }

  lapButton() {
    return <button
    id="button"
    onClick={this.handleLapPress}>
      <div id="buttonText">
        Lap
      </div>
    </button>
  }

  handleLapPress(){
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });

  }

  handleResetPress(){
    this.setState({
      startTime : new Date(),
      timeElapsed: null,
      laps: []
    });
  }

  handleStartPress(){
    if (this.state.running) {
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

  render() {
    return(
      <div id="container">
            <div id="header">
              <div id="timerWrapper">
                <p id="timer">
                  {formatTime(this.state.timeElapsed)}
                </p>
              </div>
              <div id="buttonWrapper">
                {this.startStopButton()}
                {this.lapButton()}
              </div>
                </div>
                <div id="footer">
                  {this.laps()}
                  {this.resetButton()}
                </div>
            </div>

    );
  }

}

export default Stopwatch;
