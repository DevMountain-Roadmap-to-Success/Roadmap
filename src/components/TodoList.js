import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import closeIcon from '../assets/close.png'

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
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount = () => {
    axios.get('/api/tasks')
    .then((res) =>{
       this.setState({tasks: res.data})
    })
  }
  addTodo = task => {
    axios.post('/api/addtask', {task: task})
    .then((res) => {
    this.setState({tasks: res.data})
    console.log(res)
    })
    
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
   axios.delete(`/api/tasks/delete/${id}`)
   .then((res) => {this.setState({tasks: res.data})})
  };

  removeComplete = id => {
    this.setState({ tasks: this.state.tasks.filter(todo => !todo.complete) });
  };

  render() {
    let tasks = this.state.tasks;

    // if (this.state.todoToShow === "all") {
    // } else if (this.state.todoToShow === "active") {
    // tasks = this.state.tasks.filter(task => !task.complete);
    // } else if (this.state.todoToShow === "complete") {
    // tasks = this.state.tasks.filter(task => task.complete);
    // }
    console.log(tasks)
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} >
        {tasks.map(task => (
          <div
          key={task.task_id}
          // toggleComplete={() => this.toggleComplete(task.complete)}
          >
          <span>{task.task}</span>
          <img src={closeIcon} onClick={() => this.deleteTodo(task.task_id)} alt='x'/>
          </div>
        ))
      }
      </TodoForm>

        <div>
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
                  ...task,
                  complete: this.state.toggleAllComplete
                })),
                toggleAllComplete: !this.state.toggleAllComplete
              });
            }}
          >
            Toggle All Complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}

export default TodoList;
