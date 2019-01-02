import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import {connect} from 'react-redux'
import {getTasks} from '../ducks/reducer'
import styled from "styled-components";
import Input from "./functional/Input";
import Todo from "./functional/Todo";
import Draggable from "react-draggable";
// import TimePicker from "react-time-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";



const Wrapper = styled.div`
  background-color: white;
  width: 330px;
  height: 350px;
  display: flex;
  box-shadow: 0px 1px 1px 0.5px rgb(200, 200, 200);
  justify-content: center;
  flex-direction: "column";

  button {
    background-color: transparent;
    border: none;
  }
`;
const TodoForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin-top: 5%;
  font-family: "Nunito";
  overflow: scroll;

  input {
    border: none;
    background-color: transparent;
  }
`;


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
        this.props.getTasks(e.res.data)
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
      <Draggable defaultPosition={{ x: 50, y: 50 }}>
        <Wrapper>
          <TodoForm onSubmit={this.addTodo}>
            <div style={{ marginBottom: "3%" }}>
              <Input
                name="task"
                placeholder="Stuff I need to do today"
                value={this.state.task}
                onChange={this.handleChange}
              />
              {/* <Symbol onClick={this.addTodo}>+</Symbol> */}
              <hr />
            </div>
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

          {/* <div>
          What you have left:{" "}
          {this.state.tasks.filter(task => !task.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow("all")}>All</button>
          <button onClick={() => this.updateTodoToShow("active")}>
            Active
          </button>
          <button onClick={() => this.updateTodoToShow("complete")}>
            Complete
          </button>
        </div>
        {this.state.tasks.some(task => task.complete) ? (
          <div>
            <button onClick={this.removeComplete}>Remove All Complete</button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() => {
              this.setState({
              tasks: this.state.tasks.map(task => ({
                  ...task,                  complete: this.state.toggleAllComplete
                })),
                toggleAllComplete: !this.state.toggleAllComplete
              });
            }}
          >
            Toggle All Complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div> */}
        </Wrapper>
      </Draggable>
    );
  }
}
const mapStateToProps = state => {
  return {
    task: state.task
  }
}



// const bindActionCreators = {getTasks}
export default connect(mapStateToProps, {getTasks})(TodoList);
