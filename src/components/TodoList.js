import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import Input from "./functional/Input";
import Todo from "./functional/Todo";
import note from '../assets/note.png'

const Wrapper = styled.div`
  background-color: white;
  width: 330px;
  height: 350px;
  display: flex;
  box-shadow: 0px 2px 2px 0.5px rgb(68, 68, 68);
  justify-content: center;
  flex-direction: "column";

  button {
    background-color: transparent;
    border: none;
  }
`;
const Form = styled.form`
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
const Symbol = styled.button`
  background-color: transparent;
  border: none;
  font-size: ${props => props.fontSize || "15px"};
`;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      todoToShow: "all",
      toggleAllComplete: true,
      task: "",
      complete: false,
      completeTasks: []
    };
  }

  componentDidMount = () => {
    axios.get("/api/tasks").then(res => {
      this.setState({ tasks: res.data });
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
          .put(`/api/tasks/update/${id}`, { complete: !task.complete })
          .then(res => this.setState({ tasks: res.data }));
      }
    });
  };

  render() {
    let tasks = this.state.tasks;
    console.log(this.state);

    return (
      <Wrapper>
        <Form>
          <div style={{ display: "flex", borderBottom: "black solid thin", marginBottom: '5%' }}>
            <Input
              name="task"
              placeholder="Stuff I need to do today"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <Symbol onClick={this.addTodo}>+</Symbol>
          </div>
          {tasks.map(task => (
            <Todo
              key={task.task_id}
              toggle={this.toggle}
              deleteTodo={this.deleteTodo}
              task={task}
            />
          ))}
        </Form>

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
    );
  }
}

export default TodoList;
