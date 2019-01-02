import React, { Component } from "react";
import moment from "moment";

class DayView extends Component {
  render() {
    return (
      <div>
        <h2>{moment(this.props.date, "MM/DD/YY").format("dddd")}</h2>
        <h3>{this.props.date}</h3>
      </div>
    );
  }
}
export default DayView;
