import React, { Component } from "react";
import moment from "moment";
import DayView from "./DayView";
import TimeSlot from "./TimeSlot";

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

  render() {
    let weekView = this.state.weekDays.map((day, i) => {
      return <DayView key={day} date={moment(day).format("MM/DD/YY")} />;
    });
    return (
      <div>
        <h1>calendar</h1>
        {weekView}
      </div>
    );
  }
}

export default Calendar;
