import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import { getTasks, addTask } from "../../ducks/reducer";
import Input from "../functional/Input";
import Todo from "./Todo";
import { Wrapper, TodoForm } from "./TodoStyles";
import "react-day-picker/lib/style.css";
import ReactLoading from 'react-loading'


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      toggleAllComplete: true,
      task: "",
      complete: false,
      completeTasks: [],
      editTask: false,
      id: null,
      addToCalendar: false,
      time: "",
      priority: 4,
      isLoading: true
    };
  }

  componentDidMount = () => {
    axios.get("/api/tasks").then(res => {
      this.setState({ tasks: res.data, isLoading: false });
      this.props.getTasks(res.data);
    });
  };

  addTodo = e => {
    e.preventDefault();
    let dateCreated = moment().format("YYYY-MM-DD");
    let time = moment('h').format('h:mm A')
    axios
      .post("/api/addtask", {
        date_created: dateCreated,
        task: this.state.task,
        time: time
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
    axios.delete(`/api/tasks/delete/${task_id}`).then(res => {
      this.setState({ tasks: res.data });
    });
  };
  
  toggle = id => {
    return this.state.tasks.map(task => {
      if (task.task_id === id) {
        axios
          .put(`/api/tasks/complete/${id}`, { complete: !task.complete })
          .then(res => this.setState({ tasks: res.data }));
      }
      return task
    });
  };

  toggleEditTask = (id, task) => {
    console.log(this.props.allTasks)
    return this.props.allTasks.map(task => {
    if(task.task_id === id){
      this.props.addTask(task)
     this.setState({
      editTask: !this.state.editTask
    });
  }
  return task
})
  }
  onClose = () => {
    this.setState({editTask: !this.state.editTask})
  }
  renderLoading = () => {
   if(this.state.isLoading){
   return <div style={{marginTop: '30%'}}><ReactLoading type='spokes' color='black' /></div> 
    }
  }

  render() {
    let tasks = this.state.tasks;
    return (
        <Wrapper>
        
          <TodoForm onSubmit={this.addTodo}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Input
                type="text"
                name="task"
                placeholder="Stuff I need to do today..."
                value={this.state.task}
                onChange={this.handleChange}
              />
              <hr />
            </div>
          { tasks.map(task => (
      <Todo
        key={task.task_id}
        toggle={this.toggle}
        deleteTodo={this.deleteTodo}
        task={task}
      />
    ))}
            {this.renderLoading()}
      
          </TodoForm>
        </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    todo: state.todo,
    allTasks: state.allTasks
  };
};
export default withRouter(connect(
  mapStateToProps,
  { getTasks, addTask }
)(TodoList));
