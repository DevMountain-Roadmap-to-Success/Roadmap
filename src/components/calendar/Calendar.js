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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { ColorBlock } from "../todos/TodoStyles";
import Draggable from "react-draggable";
import TimeSlot from './TimeSlot'
const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: "absolute",
    backgroundColor: "rgb(122, 202, 248)",
    zIndex: 1,
    left: "12.5%",
    top: "-20px"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  onHover: () => ({
    fab: { backgroundColor: "red" }
  })
});

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
      date: moment(),
      startOfWeek: "",
      endOfWeek: "",
      edit: false,
      activity: "",
      id: null,
      time: "09:00",
      tasks: [],
      day: moment().format('YYYY-MM-DD')
    };
  }
  

  componentDidMount = () => {
    console.log(this.state)
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

  makeActivity = (input, time, date, description, priority) => {
    let newDate = moment(date).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    var data = []
      axios
        .post("/api/makeActivity", {
          newDate,
          newTime,
          input,
          description,
          priority
        })
        .then(res => {
          this.setState({ input: '', activity: "", edit: !this.state.edit });
          this.props.getTasks(res.data)
          return data = res.data[0]
        })     
        return (
        this.fetchData() )
        }
        
      
    handleSave = (input, time, date, description, priority, id) => {
      let newDate = moment(date).format("YYYY-MM-DD");
      let newTime = moment(time, "h").format("h:mm A");
      var data = []
        axios
          .put(`/api/tasks/update/${id}`, {
            newDate,
            newTime,
            input,
            description,
            priority
          })
          .then(res => {
            this.setState({ input: '', activity: "", edit: !this.state.edit });
            return data = res.data[0]
          })     
          return (
          this.fetchData() )    
    }
  
  
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
          <ColorBlock />
          <EditTask
            save={this.handleSave}
            selectedDay={this.state.selectedDay}
            id={this.state.id}
            edit={this.state.edit}
            toggle={this.toggleEdit}
            time={this.state.time}
            updateTask={this.updateTask}
            makeActivity={this.makeActivity}
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
       this.props.addTask(task);
      }
      return task
    });
  };
  toggle = () => {
    this.setState(prevState => {
      return { edit: !prevState.edit,
      activity: '' };
    });
  };
  renderDayView = () => {
    var day = moment(this.state.date)._d;
    day = moment(day).format("YYYY-MM-DD");
    return this.state.weekDays.map((day, i) => {
      return (
        <DayView
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
    console.log(this.state)
    const { classes } = this.props;
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
          <Draggable>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
              <AddIcon
                onClick={() => this.toggleEdit(1, this.state.time, this.state.day)}
              />
            </Fab>
          </Draggable>
          <Wizard />

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

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      { toggleMenu, getTasks, addTask }
    )(Calendar)
  )
);
