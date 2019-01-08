import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";

const Input = styled.input`
  border: none;
  font-size: 16px;
`;
const TimeBox = styled.div`
  border: rgb(165, 165, 165) 0.5px solid;
  padding: 5px;
  width: 200px;
  position: relative;
  height: 90px;

  i {
    cursor: pointer;
  }
  #edit {
    position: absolute;
    right: 3px;
    top: 3px;
    font-size: 15px;
  }
  #clear {
    font-size: 12px;
  }
`;
const Activity = styled.span`
  margin-left: 15px;
  font-size: 18px;
`;
const Time = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    font-size: 12px;
    width: 80%;
    justify-content: space-evenly;
  }
`;

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      id: null,
      input: "",
      edit: false,
      priority: null
    };
  }

  componentDidMount = () => {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data[0]) {
        this.setState({
          activity: res.data[0].activity,
          id: res.data[0].id,
          priority: res.data[0].priority
        });
      }
    });
  };

  handleActivity = e => {
    this.setState({ input: e });
  };

  makeActivity = () => {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    const { input, priority } = this.state;
    axios
      .post("/api/makeActivity", { date, time, input, priority })
      .then(res => {
        console.log(res.data);
        this.setState({
          activity: res.data[0].activity,
          id: res.data[0].id,
          priority: res.data[0].priority
        });
      });
  };

  handleEdit = val => {
    this.setState({ input: val, activity: "", edit: true });
    console.log(this.state.id);
  };

  handleSave = () => {
    console.log(this.state.priority);
    let activity = this.state.input;
    let priority = this.state.priority;
    axios
      .put(`/api/editActivity/${this.state.id}`, { activity, priority })
      .then(res => {
        // console.log(res.data);
        this.setState({
          activity: res.data[0].activity,
          edit: false,
          priority: res.data[0].priority
        });
      });
  };

  handleDelete = () => {
    const { id } = this.state;
    axios.delete(`/api/deleteActivity/${id}`).then(() => {
      this.setState({ activity: "", priority: null });
    });
  };
  handleCheckBox = e => {
    this.setState({ priority: e.target.name });
  };
  renderIcon = () => {
    if (this.state.input.length > 0) {
      return (
        <>
          <i
            className="material-icons"
            id="edit"
            title="save"
            onClick={this.state.edit ? this.handleSave : this.makeActivity}
          >
            add
          </i>
          <CheckBoxWrapper>
            <span> Priority:</span>
            <div>
              High
              <input
                type="checkbox"
                name={1}
                onChange={e => this.handleCheckBox(e)}
              />
              Med
              <input type="checkbox" name={2} onChange={this.handleCheckBox} />
              Low
              <input type="checkbox" name={3} onChange={this.handleCheckBox} />
            </div>
          </CheckBoxWrapper>
        </>
      );
    }
  };

  render() {
    if (this.state.priority === 3) {
      var color = { backgroundColor: "rgb(122, 202, 248)" };
    } else if (this.state.priority === 2) {
      color = { backgroundColor: "rgb(244, 247, 113)" };
    } else if (this.state.priority === 1) {
      color = { backgroundColor: "rgb(255, 87, 87)" };
    }
    console.log(color, this.state, TimeBox.backgroundColor);
    return (
      <TimeBox style={color}>
        <Time>{this.props.time}</Time>

        {this.state.activity ? (
          <>
            <Activity>{this.state.activity}</Activity>
            <i
              className="material-icons"
              id="edit"
              title="edit"
              onClick={() => this.handleEdit(this.state.activity)}
            >
              edit
            </i>
            <i
              className="material-icons"
              id="clear"
              title="delete"
              onClick={this.handleDelete}
            >
              clear
            </i>
          </>
        ) : (
          <>
            <Input
              type="text"
              value={this.state.input}
              onChange={e => this.handleActivity(e.target.value)}
              placeholder="Type Here"
            />
            {this.renderIcon()}
          </>
        )}
      </TimeBox>
    );
  }
}

export default TimeSlot;
