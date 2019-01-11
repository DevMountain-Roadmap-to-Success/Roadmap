import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import axios from 'axios'
import {
  Back,
  EditBox,
  Main,
  EditInput,
  EditButton,
  Subject,
  Date
} from "./TodoStyles";
import Radio from "@material-ui/core/Radio";
import TimePicker from "react-time-picker";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import moment, { relativeTimeThreshold } from "moment";

class EditTask extends React.Component {
  state = {
    edit: false,
    calendarAdd: false,
    checked: { color: "blue" },
    priority: null,
    selectedDay: "",
    time: '',
    input: '',
    description: ''
  };

  componentDidMount = () => {
    this.setState({input: this.props.todo.task})
  }
  toggleEditState = () => {
    this.setState(prevState => {
      return { edit: !prevState.edit };
    });
  };
  renderDatePicker = () => {
    const { todo } = this.props;

    if (todo.date) {
      var date = moment(todo.date).format("MM-DD-YYYY");
      return <Date>{date}</Date>;
    } else {
      return null;
    }
  };
  handleTime = e => {
    this.setState({ time: e });
  };

  handleDayChange = e => {
    this.setState({ selectedDay: e });
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

  updateTask = (id) => {
    const { input, description, priority } = this.state;
    var day = this.state.selectedDay;
    var time = this.state.time;
    let newDay = moment(day).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    if(input.length > 0){
     var task = input
    } else {
      task = this.props.todo.task
    }
    console.log(task);
    axios
      .put(`/api/tasks/update/${id}`, {
        task,
        time: newTime,
        date: newDay,
        priority,
        description,
      })

      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/calendar')
        }
      });
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    var day = this.state.selectedDay;
    const FORMAT = "M/D/YYYY";
    const { todo } = this.props;

    if (todo.time) {
      var savedTime = todo.time;
    } else {
      savedTime = '';
    }

    return (
      <EditBox key={todo.id}>
        <Back onClick={this.props.toggle}>{`<< Back`}</Back>

        {!this.state.edit ? (
          <Main>
            <i className="material-icons" onClick={this.toggleEditState}>
              edit
            </i>
            <span key={todo.task_id}>{todo.task}</span>
            <span>
              Complete by:
              {this.renderDatePicker()}
            </span>
            <p>{`Notes: ${todo.description}`}</p>
          </Main>
        ) : (
          <Main>
            <EditInput
              className="card-header"
              onChange={e => this.handleChange(e)}
              name="input"
              placeholder="Task name.."
              value={this.state.input}
            />
            <hr />
            <Subject
              onChange={e => this.selectSubject(e)}
              aria-label="Type:"
            >
              <span className="type">
                Job Prep
                <Radio
                  checked={this.state.priority === 1}
                  type="radio"
                  name="job prep"
                  value={1}
                />{" "}
              </span>
              <span className="type">
                Practice Code
                <Radio
                  checked={this.state.priority === 2}
                  type="radio"
                  name="practice"
                  value={2}
                />{" "}
              </span>
              <span className="type">
                Portfolio{" "}
                <Radio
                  checked={this.state.priority === 3}
                  name="portfolio"
                  value={3}
                />
              </span>
              <span className="type">
                Other{" "}
                <Radio
                  checked={this.state.priority === 4}
                  name="other"
                  value={4}
                />
              </span>
            </Subject>
            <textarea onChange={(e) => this.handleChange(e)} name='description' value={this.props.description} placeholder='Additional Notes... '/>

            <Date>
              {" "}
              Pick a due date:
              <DayPickerInput
               value={day}
                name="selectedDay"
                onDayChange={this.handleDayChange}
                format={FORMAT}
              />
            </Date>
            <TimePicker value={savedTime} onChange={this.handleTime} />
          </Main>
        )}

        <EditButton name="Add to Calendar" onClick={() => this.updateTask(todo.task_id)} />
      </EditBox>
    );
  }
}
const mapStateToProps = state => {
  return { allTasks: state.allTasks, todo: state.todo };
};

export default withRouter(connect(mapStateToProps)(EditTask));
