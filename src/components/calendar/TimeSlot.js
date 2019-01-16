import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import {connect} from 'react-redux'
import {getTasks} from '../../ducks/reducer'


  
var color = {}


const TimeBox = styled.div`
  border: rgb(180, 180, 180) 0.5px solid;
  padding: 5px;
  width: 10.5vw;
  position: relative;
  height: 70px;
  border-radius: 3px;
  box-shadow: 0 .5px .5px 0 rgb(210, 210, 210);
  font-size: 12px;
  i {
    cursor: pointer;
  }
  #edit {
    position: absolute;
    right: 3px;
    top: 3px;
    font-size: 16px;
  }
  #clear {
    font-size: 12px;
  }
`;
const Activity = styled.span`
  margin-left: 14px;
  font-size: 14px;
`;
const Time = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

class TimeSlot extends Component {
 
   state = {
      activity: "",
      id: null,
      input: "",
      edit: false,
      priority: null,
      time: '',
      tasks: [],
      color: {},
      task: {}
    };
  
    componentWillReceiveProps = (nextProps) => {
      if(nextProps.task !== this.state.task){
        return this.componentDidMount()
      }
    }
    


  componentDidMount = () => {
    let date = moment(this.props.date).format("MM/DD/YY");
    let time = this.props.time;
    this.setState({date: date, time: time })
  //   return this.fetchData(date, time)
  // };

  
  // fetchData = (date, time) => {
  //   // const {date, time} = this.state
    axios.post('/api/activity', {date, time})
    .then((res) =>  {
      if(res.data[0]){
    this.setState({ activity: res.data[0].task, priority: res.data[0].priority, id: res.data[0].task_id, task: res.data[0] })
      } else {
         return null
      }
    })
  }
 


  handleActivity = e => {
    this.setState({ input: e });
  };

  handleEdit = val => {
    this.setState({ input: val, activity: "" });

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
  setColor = (color) => {
    if (this.state.priority === 3) {
      color = { backgroundColor: "rgb(122, 202, 248)" };
    } else if (this.state.priority === 2) {
      color = { backgroundColor: "rgb(244, 247, 113)" };
    } else if (this.state.priority === 1) {
      color = { backgroundColor: "rgb(255, 87, 87)" };
    } else if (this.state.priority === 4) {
      color = {backgroundColor: 'rgb(111, 253, 142)'}
    }
    return color
  }
  render() {
  let newColor = this.setColor(color)

    return this.state.activity ? (
      <TimeBox style={newColor}>
        <Time>{this.props.time}</Time>
          <>
            <Activity key={this.props.key}>{this.state.activity}</Activity>
            <i
              className="material-icons"
              id="edit"
              title="edit"
              onClick={() => this.props.toggle(this.state.id, this.state.time, this.state.date)}
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
       
      </TimeBox>
      ) : (
        <TimeBox><Time>{this.props.time}</Time></TimeBox>
      )
  }
}
   

  const mapStateToProps = state => {
  return { todo: state.todos, allTasks: state.allTasks }
}

export default connect(mapStateToProps, {getTasks})(TimeSlot);
