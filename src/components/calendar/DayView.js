import React, { Component } from "react";
import moment from "moment";
import TimeSlot from "./TimeSlot";
import styled from "styled-components";
import {connect} from 'react-redux'
import {getTasks, addTask} from '../../ducks/reducer'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 10.5vw;
  align-items: center;
  border: rgb(230, 230, 230) .8px solid;



  h1.day_name {
    font-weight: bold;
    font-size: 32px;
  }
`
const DayHeader = styled.div`
  border-bottom: rgb(200, 200, 200) thin solid;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  padding-bottom: 5px;
`;

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 5,
      endTime: 21,
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
    let hours = this.state.times.map((time, i) => {
      return <TimeSlot edit={this.props.edit} toggleEdit={this.props.toggle} key={i} time={time} date={this.props.date} />;
    });
    return (
      <Div>
        <DayHeader>
          <h1 className="day_name">
            {moment(this.props.date, "MM/DD/YY").format("dd")}
          </h1>
          <h2 className="the_dates">{this.props.date}</h2>
        </DayHeader>
        <span className="hours">{hours}</span>
      </Div>
    );
  }
}
const mapStateToProps = state => {
  return { 
    todo: state.todo,
    allTasks: state.allTasks
  }
}
export default connect(mapStateToProps, {getTasks, addTask})(DayView);
