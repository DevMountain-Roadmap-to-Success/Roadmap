import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: ""
    };
  }

  componentDidMount() {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    console.log(date, time);
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data) {
        this.setState({ activity: res.data.activity });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>{this.props.time}</h1>
        <input type="text" value={this.state.activity}/>
        <button>+</button>
      </div>
    );
  }
}

export default TimeSlot;
