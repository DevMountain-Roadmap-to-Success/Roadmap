import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./functional/Todo";
import axios from "axios";
import styled from 'styled-components'
import note from '../assets/note.png'

const Wrapper = styled.div `
    background-image: url(${note});
    background-repeat: no-repeat;
    background-size: 400px;
    width: 27%; 
    display: flex;
    justify-content: center;

  
    button {
      background-color: transparent;
      border: none;

    }
`
const list = {
  display: 'flex', 
  textIndent:'15px', 
  lineHeight: '25px', 
  justifyContent: 'space-between',
  width: '70%', 
  alignItems: 'center',
  fontSize: '16px'
}
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      todoToShow: "all",
      toggleAllComplete: true,
      task: '',
      complete: false
    };

  }

  componentDidMount = () => {
    axios.get('/api/tasks')
    .then((res) =>{
       this.setState({tasks: res.data})
    })
  }

  addTodo = task => {
    console.log(task)
    axios.post('/api/addtask', {task: task})
    .then((res) => {
    this.setState({tasks: res.data})
    console.log(res)
    }) 
  }

  handleChange = (e) => {
    this.setState({ [e.target.name ]: e.target.value })
  }

  toggleComplete(id) {
    this.setState({
    tasks: this.state.tasks.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  }

  updateTodoToShow = s => {
    this.setState({
      todoToShow: s
    });
  };

  deleteTodo = id => {
    console.log(id)
   axios.delete(`/api/tasks/delete/${id}`)
   .then((res) => { console.log(res.data) 
    this.setState({tasks: res.data})})
  };

  removeComplete = id => {
    this.setState({ tasks: this.state.tasks.filter(todo => !todo.complete) });
  };

  render() {
    let tasks = this.state.tasks;
    if (this.state.todoToShow === "all") {
    } else if (this.state.todoToShow === "active") {
    tasks = this.state.tasks.filter(task => !task.complete);
    } else if (this.state.todoToShow === "complete") {
    tasks = this.state.tasks.filter(task => task.complete);
    }
    return (
      <Wrapper>
        <TodoForm 
        onSubmit={this.addTodo}
        onChange={this.handleChange}
        task={this.state.task} >
         {tasks.map((task, id)  => (
          <Todo key={id}       
          toggleComplete={() => this.toggleComplete(task.complete)}
          >
          <div style={list}>        
           <span style={{fontFamily: 'Indie Flower'}} key={task.task_id}>
           <button onClick={() => this.deleteTodo(task.task_id)}>x</button>{task.task}</span>
          {/* <input type='checkbox' onClick={() => this.toggleComplete(task.task_id)}/> */}
          </div>
          </Todo>
        ))
      }
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
    );
  }
}

export default TodoList;
