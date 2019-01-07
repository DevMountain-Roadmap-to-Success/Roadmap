import React, { Component } from "react";
import moment from "moment";
import TimeSlot from "./TimeSlot";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1.day_name {
    font-weight: bold;
    font-size: 32px;
  }
`;
const DayHeader = styled.div`
  border: black thin solid;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
      return <TimeSlot key={i} time={time} date={this.props.date} />;
    });
    return (
      <Div>
        <DayHeader>
          <h1 className="day_name">
            {moment(this.props.date, "MM/DD/YY").format("dddd")}
          </h1>
          <h2 className="the_dates">{this.props.date}</h2>
        </DayHeader>
        <span className="hours">{hours}</span>
      </Div>
    );
  }
}
export default DayView;
