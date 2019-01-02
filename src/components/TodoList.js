import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import {connect} from 'react-redux'
import {getTasks} from '../ducks/reducer'
import styled from "styled-components";
import Input from "./functional/Input";
import Todo from "./functional/Todo";
import Draggable from "react-draggable";
import {Wrapper, TodoForm} from './Styles'
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";



export const MyDatePicker = () => {
  return (
    <DayPickerInput
      dayPickerProps={{
        month: new Date(),
        showWeekNumbers: true,
        todayButton: 'Today',
      }}
    />
  );
}
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      todoToShow: "all",
      toggleAllComplete: true,
      task: "",
      complete: false,
      completeTasks: [],
      editTask: false
    };
  }

  componentDidMount = () => {
    axios.get("/api/tasks").then(res => {
      this.setState({ tasks: res.data })
      this.props.getTasks(res.data)
    });
  };

  addTodo = e => {
    e.preventDefault();
    let dateCreated = moment().format("YYYY-MM-DD");
    console.log(dateCreated);
    axios
      .post("/api/addtask", {
        date_created: dateCreated,
        task: this.state.task
      })
      .then(res => {
        this.setState({
          tasks: res.data,
          task: ""
        });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteTodo = task_id => {
    console.log(task_id);
    axios.delete(`/api/tasks/delete/${task_id}`).then(res => {
      this.setState({ tasks: res.data });
    });
  };

  toggle = id => {
    console.log(this.state);
    this.state.tasks.map(task => {
      if (task.task_id === id) {
        axios
          .put(`/api/tasks/complete/${id}`, { complete: !task.complete })
          .then(res => this.setState({ tasks: res.data }));
      }
    });
  };

  handleDayChange = (e, selectedDay, modifiers, dayPickerInput) => {
    e.preventDefault();
    console.log(dayPickerInput.target);
    this.setState({
      selectedDay,
      isValidDay: typeof selectedDay !== "undefined",
      isDisabled: modifiers.disabled === true,
    });
  };

  render() {
    console.log(this.props)
    let tasks = this.state.tasks;
    console.log(this.state);

    return (
      // <Draggable defaultPosition={{ x: 50, y: 50 }}>
        <Wrapper>
          <TodoForm onSubmit={this.addTodo}>
            {/* <div style={{ marginBottom: "3%" }}> */}
              <Input
                type='text'
                name='task'
                placeholder="Stuff I need to do today"
                value={this.state.task}
                onChange={this.handleChange}
              />
              <hr />
            {/* </div> */}
            {tasks.map(task => (
              <Todo
                key={task.task_id}
                toggle={this.toggle}
                deleteTodo={this.deleteTodo}
                task={task}
                onDoubleClick={this.props.toggleEdit}
              />
            ))}
          </TodoForm>
        </Wrapper>
      // </Draggable>
    );
  }
}
const mapStateToProps = state => {
  return {
    task: state.task
  }
}
export default connect(mapStateToProps, {getTasks})(TodoList);
