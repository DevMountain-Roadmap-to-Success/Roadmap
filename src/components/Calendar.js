import React, { Component } from "react";
import moment from "moment";
import DayView from "./DayView";
import styled from "styled-components";
// import TimeSlot from "./TimeSlot";
import Header from './functional/Header'
import SideBar from './functional/SideBar'
import {Link} from 'react-router-dom'
import {toggleMenu} from '../ducks/reducer'
import {connect} from 'react-redux'
const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: [],
      date: moment(),
      startOfWeek: "",
      endOfWeek: "",

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

  render() {
    let month = moment(this.state.date).format('MMMM')
    console.log(month)
    let weekView = this.state.weekDays.map((day, i) => {
      return <DayView key={day} date={moment(day).format("MM/DD/YY")} />;
    });
    return (
      <div>
      <Header >
      <h1 style={{textAlign: 'center', width: '80%'}}>{month}</h1>
      </Header>
    <SideBar>     
           <Link to="/dashboard" onClick={this.props.toggleMenu}>
              <i className="material-icons">home</i>Dashboard
         </Link> 
     </SideBar>


       <WeekContainer>
      {weekView}
     </WeekContainer>
     </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    open: state.open
  }
}

export default connect(mapStateToProps, {toggleMenu})(Calendar);
