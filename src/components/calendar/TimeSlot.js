import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import Radio from '@material-ui/core/Radio';
import Modal from '../functional/Modal'
import EditTask from '../todos/EditTask'
import {connect} from 'react-redux'
import {getTasks} from '../../ducks/reducer'

const EditBox = styled(EditTask)`
  width: 300px;
  height: 300px;
z-index:10;
  background-color: white;
`
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

const EditModal = styled(Modal)`
    width: 300px;

`

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
      console.log(res.data)
      if (res.data[0]) {
        this.setState({
          activity: res.data[0].task,
          id: res.data[0].task_id,
          priority: res.data[0].priority
        });
        this.props.getTasks(res.data[0])
      }
    });
  };

  handleActivity = e => {
    this.setState({ input: e });
  };

  makeActivity = () => {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    console.log(time)
    const { input, priority } = this.state;
    axios
      .post("/api/makeActivity", { date, time, input, priority })
      .then(res => {
        console.log(res.data);
        this.setState({
          activity: res.data[0].task,
          id: res.data[0].task_id,
          priority: res.data[0].priority
        });
      });
  };

  handleEdit = val => {
    this.setState({ input: val, activity: "" });
    console.log(this.state.id);
  };

  handleSave = () => {
    let activity = this.state.input;
    let priority = this.state.priority;
    axios
      .put(`/api/editActivity/${this.state.id}`, { activity, priority })
      .then(res => {
        // console.log(res.data);
        this.setState({
          activity: res.data[0].task,
          edit: !this.state.edit,
          priority: res.data[0].priority,
          id: res.data[0].task_id
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
    const {activity} = this.state
    if (this.state.input.length > 0) {
      return (
        <>
          <i className='material-icons' onClick={activity ? this.handleSave : this.makeActivity}>add</i>
        </>
      );
    }
  };

 
  render() {
    console.log(this.props)
    const {todo} = this.props
    if (this.state.priority === 3) {
      var color = { backgroundColor: "rgb(122, 202, 248)" };
    } else if (this.state.priority === 2) {
      color = { backgroundColor: "rgb(244, 247, 113)" };
    } else if (this.state.priority === 1) {
      color = { backgroundColor: "rgb(255, 87, 87)" };
    } else if (this.state.priority === 4) {
      color = {backgroundColor: 'rgb(111, 253, 142)'}
    }
    return (
      <>
      <TimeBox style={color}>
        <Time>{this.props.time}</Time>

        {this.state.activity ? (
          <>
            <Activity>{this.state.activity}</Activity>
            <i
              className="material-icons"
              id="edit"
              title="edit"
              onClick={() => this.props.toggleEdit(this.state.activity, this.state.id)}
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
        </>
    );
  }
}
const mapStateToProps = state => {
  return { allTasks: state.allTasks, todo: state.todos}
}

export default connect(mapStateToProps, {getTasks})(TimeSlot);
