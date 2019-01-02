import React, { Component } from "react";
import moment from "moment";
import TimeSlot from "./TimeSlot";

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 9,
      endTime: 17,
      times: [{ time: "", activity: "" }]
    };
  }

  componentDidMount() {
    const { startTime, endTime } = this.state;
    let times = [];
    let currentTime = startTime;
    for (let i = currentTime; i < endTime; i++) {
      times.push({ time: moment(currentTime, 'h').format('h:mm A'), activity: "" });
      currentTime++;
    }
    this.setState({ times });
  }

  render() {
    console.log(this.state.times);
    let hours = this.state.times.map((time, i) => {
      return <TimeSlot key={i}  time={time}/>
    });
    return (
      <div>
        <h2>{moment(this.props.date, "MM/DD/YY").format("dddd")}</h2>
        <h3>{this.props.date}</h3>
        {hours}
      </div>
    );
  }
}
export default DayView;
