import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import {withRouter} from 'react-router'
import { getTasks } from "../../ducks/reducer";
import Input from "../functional/Input";
import Todo from "./Todo";
import { Wrapper, TodoForm } from "./TodoStyles";
import "react-day-picker/lib/style.css";
import EditTask from "./EditTask";



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
      selectedDay: "",
      addToCalendar: false,
      time: "",
      priority: null
    };
  }

  componentDidMount = () => {
    axios.get("/api/tasks").then(res => {
      console.log(res.data);
      this.setState({ tasks: res.data });
      this.props.getTasks(res.data);
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
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteTodo = task_id => {
    console.log(task_id);
    axios.delete(`/api/tasks/delete/${task_id}`).then(res => {
      this.setState({ tasks: res.data });
    });
  };
  selectSubject = e => {
    console.log(e.target.name);
    var val = null;
    if (e.target.name === "job prep") {
      val = 1;
    } else if (e.target.name === "practice") {
      val = 2;
    } else if (e.target.name === "portfolio") {
      val = 3;
    } else {
      val = 4;
    }
    this.setState({ priority: val });
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
    console.log(task, id);
    this.setState({
      id: id,
      task: task,
      editTask: !this.state.editTask
    });
    return id;
  };

  updateTask = () => {
    console.log(this.state);
    const { task, description, priority } = this.state;
    var day = this.state.selectedDay;
    var time = this.state.time;
    let newDay = moment(day).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    const input = task;
    console.log(time, day);
    axios
      .post("/api/makeActivity", {
        input,
        time: newTime,
        date: newDay,
        priority
      })

      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/calendar')
        }
      });
  };

  addTo = () => {
    this.setState(prevState => {
      return { addToCalendar: !prevState.addToCalendar };
    });
  };
  handleTime = e => {
    this.setState({ time: e });
  };

  handleDayChange = e => {
    this.setState({ selectedDay: e });
  };
  showTasks = () => {
    let tasks = this.state.tasks;
    return tasks.map(task => (
      <Todo
        key={task.task_id}
        toggle={this.toggle}
        deleteTodo={this.deleteTodo}
        task={task}
        editTask={this.toggleEditTask}
      />
    ));
  };

  render() {
    console.log(this.state.addToCalendar);
    return (
      // <Draggable defaultPosition={{ x: 50, y: 50 }}>
      !this.state.editTask ? (
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
            {this.showTasks()}
          </TodoForm>
        </Wrapper>
      ) : (
        <EditTask
          {...this.state}
          key={1}
          editTask={this.state.editTask}
          selectedDay={this.state.selectedDay}
          id={this.state.id}
          time={this.state.time}
          toggle={this.toggleEditTask}
          onClick={this.updateTask}
          onSelect={this.addTo}
          onChange={this.handleChange}
          selectSubject={this.selectSubject}
          handleTime={e => this.handleTime(e)}
          handleDayPicker={e => this.handleDayChange(e)}
        />
      )
      // </Draggable>
    );
  }
}
const mapStateToProps = state => {
  return {
    task: state.task
  };
};
export default withRouter(connect(
  mapStateToProps,
  { getTasks }
)(TodoList));
