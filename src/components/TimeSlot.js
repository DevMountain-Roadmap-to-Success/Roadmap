import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from 'styled-components'

const Input = styled.input `
  border: none;

`

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      id: null,
      input: ""
    };
  }

  componentDidMount = () => {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data[0]) {
        
        this.setState({ activity: res.data[0].activity, id: res.data[0].id });
      }
    });
  }
 

  handleActivity = (e) => {
    this.setState({ input: e });
  }

  makeActivity = () => {
    console.log(this.state.id)
    if(this.state.id){
      this.handleSave()
    } else {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    const { input } = this.state;
    axios.post("/api/makeActivity", { date, time, input }).then(res => {
      console.log(res.data);
      this.setState({ activity: res.data[0].activity });
    });
  }
}

  handleEdit = (val) => {
    this.setState({ input: val, activity: "" });
  }

  handleSave = () => {
    let activity = this.state.input;
    axios.put(`/api/editActivity/${this.state.id}`, { activity }).then(res => {
      console.log(res.data);
      this.setState({ activity: res.data[0].activity });
    });
  }

  handleDelete = () => {
    const { id } = this.state;
    axios.delete(`/api/deleteActivity/${id}`).then(res => {
      this.setState({ activity: res.data });
    });
  }

  render() {
    return (
      <div >
        <h1>{this.props.time}</h1>

        {this.state.activity ? (
          <>
            <span>{this.state.activity}</span>
            <i className='material-icons'onClick={() => this.handleEdit(this.state.activity)}>
              edit
            </i>
            <i className="material-icons" onClick={this.handleDelete}>clear</i>
          </>
        ) : (
          <>
            <Input
              type="text"
              value={this.state.input}
              onChange={e => this.handleActivity(e.target.value)}
            />
            <i className='material-icons' onClick={this.makeActivity}>add</i>
          </>
        )}
      </div>
    );
  }
}

export default TimeSlot;
