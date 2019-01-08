import React, { Component } from "react";
import moment from "moment";
import DayView from "./DayView";
import styled from "styled-components";
// import TimeSlot from "./TimeSlot";
import Header from "./Header";
import SideBar from "./functional/SideBar";
import { Link } from "react-router-dom";
import { toggleMenu } from "../ducks/reducer";
import { connect } from "react-redux";

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SwitchWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  margin-top: 10px;

  button{
    border-radius:5px;
    background: #2F3642;
    color: #F3F3F3;
    box-shadow: 1px 1px 1px gray;
    outline: none;
  }
  button:hover{
    background-color: rgb(122, 202, 248);
    cursor: pointer;
  }
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: [],
      date: moment(),
      startOfWeek: "",
      endOfWeek: ""
    };
  }

  componentDidMount() {
    let stateUpdates = this.createDates();
    let { weekDays, date, startOfWeek, endOfWeek } = stateUpdates;
    this.setState({ weekDays, date, startOfWeek, endOfWeek });
  }

  createDates = (date = moment()) => {
    var startOfWeek = moment(date).startOf("Week");
    var endOfWeek = moment(date).endOf("Week");
    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }

    let stateUpdates = {
      date: date.format("MM/DD/YY"),
      weekDays: days,
      startOfWeek: startOfWeek.format("MM/DD/YY"),
      endOfWeek: endOfWeek.format("MM/DD/YY")
    };
    return stateUpdates;
  };

  switchWeek = days => {
    let newDay = this.state.date;
    newDay = moment(newDay).add(days, "d");

    let stateUpdates = this.createDates(newDay);
    let { weekDays, date, startOfWeek, endOfWeek } = stateUpdates;
    this.setState({ weekDays, date, startOfWeek, endOfWeek });
  };

  render() {
    let month = moment(this.state.date).format("MMMM");
    console.log(month);
    let weekView = this.state.weekDays.map((day, i) => {
      return <DayView key={day} date={moment(day).format("MM/DD/YY")} />;
    });
    return (
      <div>
        <Header>
          <h1 style={{ textAlign: "center", width: "80%" }}>{month}</h1>
        </Header>
        <SwitchWeek>
          <button onClick={() => this.switchWeek(-7)}>{"<"}</button>
          <h2>{` ${this.state.startOfWeek} - ${this.state.endOfWeek} `}</h2>
          <button onClick={() => this.switchWeek(7)}>{">"}</button>
        </SwitchWeek>
        <WeekContainer>{weekView}</WeekContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default connect(
  mapStateToProps,
  { toggleMenu }
)(Calendar);
