import React, { Component } from "react";
import moment from "moment";
import DayView from "./DayView";
import styled from "styled-components";
import axios from "axios";
import Header from "../Header";
import { toggleMenu, addTask, getTasks } from "../../ducks/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Modal from "../functional/Modal";
import EditTask from "./EditTask";
import Wizard from "../functional/Wizard";

import {toggle} from '../../Tests/Logic/logic_randall'



const EditModal = styled(Modal)`
  width: 450px;
  height: 500px;
  z-index: 10;
  border-radius: 5px;
  background-color: white;
  position: relative;
`;
const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: black;
`;

const CalendarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;

  .calendar {
    contain: content;
    height: 640px;
    overflow: scroll;
    box-shadow: 0px 1px 1px 0px rgb(190, 190, 190);
    border-radius: 2px;
  }
`;
const SwitchWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  margin-top: 1%;
  margin-bottom: 1%;

  button {
    border-radius: 5px;
    background: #2f3642;
    color: #f3f3f3;
    box-shadow: 1px 1px 1px gray;
    outline: none;
  }
  button:hover {
    background-color: rgb(122, 202, 248);
    cursor: pointer;
  }
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: [],
      startOfWeek: "",
      endOfWeek: "",
      edit: false,
      activity: "",
      id: 1,
      tasks: [],
      day: moment().format('YYYY-MM-DD'),
      time: '09:00'
    };
  }
  

  componentDidMount = () => {
    let stateUpdates = this.createDates();
    let { weekDays, date, startOfWeek, endOfWeek } = stateUpdates;
    this.setState({ weekDays, date, startOfWeek, endOfWeek });
   return this.fetchData()
  }
 

  
  fetchData = () => {   
    axios.get('/api/activity')
    .then((res) => {
      this.props.getTasks(res.data)
      this.setState({tasks: res.data})
    })
  }

  makeActivity = (input, time, date, description, priority, e) => {
    e.preventDefault(e)
    let newDate = moment(date).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    axios
      .post("/api/makeActivity", {
        newDate,
        newTime,
        input,
        description,
        priority
      })
      .then(res => {
        this.setState({ tasks: res.data, edit: !this.state.edit });
      });
  };

  handleSave = (input, time, date, description, priority, id, e) => {
    e.preventDefault()
    let newDate = moment(date).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    axios
      .put(`/api/tasks/update/${id}`, {
        newDate,
        newTime,
        input,
        description,
        priority
      })
      .then(res => {
        if(res.data[0].task.date !== this.state.selectedDay){
        this.setState({ edit: !this.state.edit, id: '', activity: '', selectedDay: '', time: '', task: res.data[0] })
        return window.location.reload(true)
        }
       
      });
  };
  createDates = (date = moment()) => {
    var startOfWeek = moment(date).startOf("Week");
    var endOfWeek = moment(date).endOf("Week");
    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, "d");
    }

    let stateUpdates = {
      date: date.format("MM/DD/YY"),
      weekDays: days,
      startOfWeek: startOfWeek.format("MM/DD/YY"),
      endOfWeek: endOfWeek.format("MM/DD/YY")
    };
    return stateUpdates;
  };

  switchWeek = days => {
    let newDay = this.state.date;
    newDay = moment(newDay).add(days, "d");

    let stateUpdates = this.createDates(newDay);
    let { weekDays, date, startOfWeek, endOfWeek } = stateUpdates;
    this.setState({ weekDays, date, startOfWeek, endOfWeek });
  };
  showEditBox = () => {
      return this.state.edit ? (
        <EditModal>

          <EditTask
            save={this.handleSave}
            selectedDay={this.state.selectedDay}
            id={this.state.id}
            edit={this.state.edit}
            toggle={this.toggleEdit}
            time={this.state.time}
            updateTask={this.updateTask}
            create={this.makeActivity}
          />
        </EditModal>
      ) : (
          null
      )
    }
  
  toggleEdit = (id, time, day) => {
    this.setState({
      edit: !this.state.edit,
      id: id,
      time: time,
      selectedDay: day
    });
   return this.props.allTasks.map(task => {
      if (task.task_id === id) {
        return this.props.addTask(task)
      }
    });
  };
  toggle = () => {
    this.setState(prevState => {
      return { edit: toggle(prevState.edit),
      activity: '' };
    });
  };
  renderDayView = () => {
    // var day = moment(this.state.date)._d.format('YYYY-MM-DD');
    // // day = moment(day).format("YYYY-MM-DD");
    return this.state.weekDays.map((day, i) => {
      return (
        <DayView
          task={this.state.task}
          refresh={this.refreshActivity}
          tasks={this.state.tasks}
          edit={this.state.edit}
          toggle={this.toggleEdit}
          key={day}
          date={moment(day).format("MM/DD/YY")}
        />
      );
    });
  }
 
  render() {
    let month = moment(this.state.date).format("MMMM");
    return (
      <>
        <Header>
          <h1 style={{ textAlign: "center", width: "80%" }}>{month}</h1>
        </Header>

        <SwitchWeek>
          <button onClick={() => this.switchWeek(-7)}>{"<"}</button>
          <h2>{` ${this.state.startOfWeek} - ${this.state.endOfWeek} `}</h2>
          <button onClick={() => this.switchWeek(7)}>{">"}</button>
        </SwitchWeek>
        <CalendarWrapper>
          <Wizard  onClick={() => this.toggleEdit(1, this.state.time, this.state.day)}/>
        
          
          <div className="calendar">
            <WeekContainer>{this.renderDayView()}</WeekContainer>
          </div>
        </CalendarWrapper>
        {this.showEditBox()}
      </>
    );
  }
}
Calendar.defaultProps = {
    day: 'YYYY-MM-DD',
    time: '09:00'
}
const mapStateToProps = state => {
  return {
    open: state.open,
    todo: state.todo,
    allTasks: state.allTasks
  };
};

export default 
  withRouter(
    connect(
      mapStateToProps,
      { toggleMenu, getTasks, addTask }
    )(Calendar)
  )

