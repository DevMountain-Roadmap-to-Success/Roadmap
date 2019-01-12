import React, { Component } from "react";
import moment from "moment";
import DayView from "./DayView";
import styled from "styled-components";
import axios from 'axios'
import Header from "../Header";
import { toggleMenu, addTask, getTasks } from "../../ducks/reducer";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import Modal from '../functional/Modal'
import EditTask from './EditTask'
import Wizard from '../functional/Wizard'
import TimeSlot from '../calendar/TimeSlot'


const EditModal = styled(Modal)`
  width: 450px;
  height: 500px;
  z-index:10;
  border-radius: 3px;
  background-color: white;
`
const WeekContainer = styled.div`
  display: flex;
  justify-content: center;

`;

const CalendarWrapper = styled.div` 
  display: flex;
  justify-content: space-evenly;
  width: 85%;

`
const SwitchWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  margin-top: 10px;

  button{
    border-radius:5px;
    background: #2F3642;
    color: #F3F3F3;
    box-shadow: 1px 1px 1px gray;
    outline: none;
  }
  button:hover{
    background-color: rgb(122, 202, 248);
    cursor: pointer;
  }
`;




class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: [],
      date: moment(),
      startOfWeek: "",
      endOfWeek: "",
      edit: false,
      activity: '',
      id: null,
      time: ''
    };
  }

  componentDidMount() {
    let stateUpdates = this.createDates();
    let { weekDays, date, startOfWeek, endOfWeek } = stateUpdates;
    this.setState({ weekDays, date, startOfWeek, endOfWeek });
  }

  makeActivity = (input, time, date, description, priority) => {
    let newDate = moment(date).format('YYYY-MM-DD')
    let newTime = moment(time, 'h').format('h:mm A')
    axios
      .post("/api/makeActivity", { newDate, newTime, input, description, priority })
      .then(res => {
        this.props.getTasks(res.data)
        this.setState({force: true, activity: ''})
      });
      this.toggle()

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
    if(this.state.edit){
      return (
<EditModal>
<EditTask 
 selectedDay={this.state.selectedDay}
id={this.state.id} edit={this.state.edit} toggle={this.toggle} time={this.state.time} 
  makeActivity={this.makeActivity}>
</EditTask>
</EditModal>


      )
    }
  }
  toggleEdit = (id, time, day) => {
      this.setState({
      edit: !this.state.edit,
      id: id,
      time: time,
      selectedDay: day
    });
    return this.props.allTasks.map(task => {
      if(task.task_id === id){
        this.props.addTask(task)
      }
    })
  }
  toggle = () => {
    this.setState(prevState =>{
      return {edit: !prevState.edit}
    })
  }



  render() {

    let month = moment(this.state.date).format("MMMM");
    let weekView = this.state.weekDays.map((day, i) => {
      return <DayView force edit={this.state.edit} toggle={this.toggleEdit}key={day} date={moment(day).format("MM/DD/YY")} />;
    });
    return (
      <>
        <Header>
          <h1 style={{ textAlign: "center", width: "80%" }}>{month}</h1>
        </Header>

      <CalendarWrapper>

        <Wizard />

        <div>
        <SwitchWeek>
          <button onClick={() => this.switchWeek(-7)}>{"<"}</button>
          <h2>{` ${this.state.startOfWeek} - ${this.state.endOfWeek} `}</h2>
          <button onClick={() => this.switchWeek(7)}>{">"}</button>
        </SwitchWeek>
        <WeekContainer>{weekView}{this.showEditBox()}</WeekContainer>
        </div>
      </CalendarWrapper>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    open: state.open,
    todo: state.todo,
    allTasks: state.allTasks
  };
};

export default withRouter(connect(
  mapStateToProps,
  { toggleMenu, getTasks, addTask }
)(Calendar));
