import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import Radio from '@material-ui/core/Radio';
import Modal from '../functional/Modal'
import EditTask from './EditTask'
import {connect} from 'react-redux'
import {getTasks} from '../../ducks/reducer'



const TimeBox = styled.div`
  border: rgb(180, 180, 180) 0.5px solid;
  padding: 5px;
  width: 10vw;
  position: relative;
  height: 70px;
  border-radius: 3px;
  box-shadow: 0 .5px .5px 0 rgb(210, 210, 210);

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
  text-align: center;
`;


class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      id: null,
      input: "",
      edit: false,
      priority: null,
      time: ''
    };
  }

  componentDidMount = () => {
    let date = moment(this.props.date).format("YYYY/MM/DD");
    let time = this.props.time;
    axios.post(`/api/activity`, { date, time }).then(res => {
      if (res.data[0]) {
        this.setState({
          activity: res.data[0].task,
          id: res.data[0].task_id,
          priority: res.data[0].priority,
        });
        axios.get('/api/activity')
        .then((res) => {
        this.props.getTasks(res.data)
      })
    }
    });
  };
  componentDidUpdate = (prevProps, prevState) => {

      // only update chart if the data has changed
      if (this.state !== prevState) {
          this.render()
      }
    
  }


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
   const { id, priority, activity } = this.state
    axios
      .put(`/api/editActivity/${id}`, { activity, priority })
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
      this.setState({ activity: "", priority: null, input: '' });
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
              onClick={() => this.props.toggleEdit(this.state.id, this.props.time, this.props.date)}
            >
              edit
            </i>
            <i
              className="material-icons"
              title="delete"
              onClick={this.handleDelete}
              style={{fontSize: '13px', fontWeight: 500}}
            >
              clear
            </i>
          </>
        ) : (
          <>
             {/* <i className='material-icons' new='new' onClick={() => this.props.toggleEdit(1, this.props.time, this.props.date)}>add</i> */}
               {/* {this.renderIcon()} */}

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
