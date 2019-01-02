import React, { Component } from "react";
// import moment from "moment";
import axios from "axios";

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: ""
    };
  }

  componentDidMount() {
    axios.get('');
  }
  render() {
    return (
      <div>
        <h1>{this.props.time}</h1>
        <h2>{this.props.activity}</h2>
        <input type="text" />
        <button>+</button>
      </div>
    );
  }
}

export default TimeSlot;
