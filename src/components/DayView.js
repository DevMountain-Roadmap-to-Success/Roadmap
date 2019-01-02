import React, { Component } from "react";
import moment from "moment";
import TimeSlot from "./TimeSlot";

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 9,
      endTime: 17,
      times: []
    };
  }

  componentDidMount() {
    const { startTime, endTime } = this.state;
    let times = [];
    let currentTime = startTime;
    for (let i = currentTime; i < endTime; i++) {
      times.push(moment(currentTime, "h").format("h:mm A"));
      currentTime++;
    }
    this.setState({ times });
  }

  render() {
    // console.log(this.state.times);
    let hours = this.state.times.map((time, i) => {
      return <TimeSlot key={i} time={time} date={this.props.date}/>;
    });
    return (
      <div>
        <h1>{moment(this.props.date, "MM/DD/YY").format("dddd")}</h1>
        <h2>{this.props.date}</h2>
        {hours}
      </div>
    );
  }
}
export default DayView;
