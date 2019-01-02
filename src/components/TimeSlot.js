import React, { Component } from "react";
import moment from "moment";

class TimeSlot extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    return (
      <div>
        <h1>{this.props.time}</h1>
      </div>
    );
  }
}

export default TimeSlot;
