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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import {ColorBlock} from '../todos/TodoStyles';
import Draggable from 'react-draggable';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    backgroundColor: 'rgb(122, 202, 248)',
    zIndex: 1,
    left: '12.5%',
    top: '-20px'
   
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,

  },
  onHover: () => ({
    fab: { backgroundColor: 'red' }
  })
});


const EditModal = styled(Modal)`
  width: 450px;
  height: 500px;
  z-index:10;
  border-radius: 5px;
  background-color: white;
  position: relative;

`
const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
border-bottom: black;

`;

const CalendarWrapper = styled.div` 
  display: flex;
  width: 100%;
  /* padding: 20px; */
 justify-content: center;
 position: relative;
  

  .calendar {
    contain: content;
    height: 640px;
    overflow: scroll;
    box-shadow: 0px 1px 1px 0px rgb(190, 190, 190);
    border-radius: 2px;
  }

`
const SwitchWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  margin-top: 1%;
  margin-bottom: 1%;

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
      time: '09:00'
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
    console.log(this.state.id, input, time, date, description, priority)
    if(this.state.id > 2){
      axios
      .put(`/api/tasks/update/${this.state.id}`, {
         newDate, newTime, input, description, priority 
      }) 
      .then(res => {
        this.props.getTasks(res.data)
        this.setState({force: true, activity: ''})
      });
      this.toggle()
    } else {
    axios
      .post("/api/makeActivity", { newDate, newTime, input, description, priority })
      .then(res => {
        this.props.getTasks(res.data)
        this.setState({force: true, activity: ''})
      });
      this.toggle()
    }
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
<ColorBlock/>
<EditTask 
 selectedDay={this.state.selectedDay}
id={this.state.id} edit={this.state.edit} 
toggle={this.toggle} time={this.state.time}
updateTask={this.updateTask} 
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
    var day = moment(this.state.date)._d
     day = moment(day).format('YYYY-MM-DD')
const {classes} = this.props
    let month = moment(this.state.date).format("MMMM");
    let weekView = this.state.weekDays.map((day, i) => {
      return <DayView force edit={this.state.edit} toggle={this.toggleEdit} key={day} date={moment(day).format("MM/DD/YY")} />;
    });
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
      <CalendarWrapper >
      <Draggable>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => this.toggleEdit(1, this.state.time,  day,)}/>
      </Fab>
      </Draggable>
        <Wizard />
         
        <div className='calendar'>
        
        <WeekContainer>{weekView}</WeekContainer>
        </div>
      </CalendarWrapper>
      {this.showEditBox()}
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

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  { toggleMenu, getTasks, addTask }
)(Calendar)));
