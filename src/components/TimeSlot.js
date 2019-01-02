import React, { Component } from "react";
import moment from "moment";

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 9,
      endTime: 17
    };
  }

  componentDidMount(){
      let times = []
      let currentTime = this.state.startTime
      times.push(moment(currentTime))
  }


  render() {
    return (
      <div>
        <h1>Time</h1>
      </div>
    );
  }
}

export default TimeSlot;
