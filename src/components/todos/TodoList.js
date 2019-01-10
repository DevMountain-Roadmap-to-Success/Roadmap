import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import {connect} from 'react-redux'
import {getTasks} from '../../ducks/reducer'
// import styled from "styled-components";
import Input from "../functional/Input";
import Todo from "./Todo";
// import Draggable from "react-draggable";
import {Wrapper, TodoForm} from '../Styles'
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import EditTask from './EditTask'


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
      editTask: false,
      id: null,
      selectedDay: ''
    };
  }

  componentDidMount = () => {
    axios.get("/api/tasks").then(res => {
      console.log(res.data)
      this.setState({ tasks: res.data })
      this.props.getTasks(res.data)
    });
  };



  toggleEdit = () => {
    this.setState(prevState => {
      return {
        editTask: !prevState.editTask
      };
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
    console.log(e.target.name)
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

  toggleEditTask = (id, task) => {
    console.log(task, id)
    this.setState({
      id: id,
      task: task,
      editTask: !this.state.editTask
    })
  }
  
  updateTask = (task_name, task_description) => {
    if(this.state.description.length && this.state.task.length > 0){
      var description = this.state.description
      var task = this.state.task
    } else {
     description = task_description
    task = task_name
    }
    var day = this.state.selectedDay
    day = moment().format('YYYY-MM-DD')
    axios.put(`/api/tasks/update/${this.state.id}`, {
      complete_by: day,
      description,
      task
    })
    .then((res) => {
      this.setState({ editTask: false, tasks: res.data, task: '', id: ''})
    })
 
}
  

  handleDayChange = (day ) => {
    this.setState({selectedDay: day})
  };
  showTasks = () => {
    let tasks = this.state.tasks
    return tasks.map(task => ( 
      
      <Todo
     key={task.task_id}
     toggle={this.toggle}
     deleteTodo={this.deleteTodo}
     task={task}
     editTask={ this.toggleEditTask }
   />
   
   ))}
  
 
  render() {
    return (
      // <Draggable defaultPosition={{ x: 50, y: 50 }}>
        <Wrapper>
          <TodoForm onSubmit={this.addTodo}>
          {!this.state.editTask ?
          <>
            <div style={{display:'flex', justifyContent: 'center'}} >
              <Input
                type='text'
                name='task'
                placeholder="Stuff I need to do today..."
                value={this.state.task}
                onChange={this.handleChange}
              />
              <hr />
            </div>
          { this.showTasks() }
          </>
          
           :  <EditTask
            {...this.state}
           toggle={this.toggleEditTask}
           editTask={this.state.editTask}
           update={this.updateTask}
           name="description"
           onChange={this.handleChange}
           handleDayChange={this.handleDayChange}
           selectedDay={this.state.selectedDay} /> }
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
