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
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data[0]) {
        console.log(res.data[0].activity);
        this.setState({ activity: res.data[0].activity });
      }
    });
  }
  handleActivity(e) {
    this.setState({ activity: e });
  }

  makeActivity() {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    const { activity } = this.state;
    axios.post("/api/makeActivity", { date, time, activity }).then(res => {
      console.log(res.data);
      this.setState({ activity: res.data[0].activity });
    });
  }

  handleEdit() {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    const { activity } = this.state;
    axios.put("/api/editActivity", { date, time, activity }).then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.time}</h1>
        <input
          type="text"
          value={this.state.activity}
          onChange={e => this.handleActivity(e.target.value)}
        />

        <button onClick={() => this.handleEdit()}>Edit</button>

        <button onClick={() => this.makeActivity()}>+</button>
      </div>
    );
  }
}

export default TimeSlot;
