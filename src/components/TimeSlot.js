import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      id: null
    };
  }

  componentDidMount() {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data[0]) {
        console.log(res.data[0].activity);
        this.setState({ activity: res.data[0].activity, id: res.data[0].id });
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
      this.setState({ activity: res.data[0].activity });
    });
  }

  handleDelete() {
    const { id } = this.state;
    axios.delete(`/api/deleteActivity/${id}`).then(res => {
      this.setState({ activity: res.data });
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

        <button onClick={() => this.makeActivity()}>+</button>
        <button onClick={() => this.handleEdit()}>Edit</button>
        <button onClick={() => this.handleDelete()}>Clear</button>
      </div>
    );
  }
}

export default TimeSlot;
