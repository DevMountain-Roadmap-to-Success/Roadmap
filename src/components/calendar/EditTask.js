import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import axios from 'axios'
import {addTask, getTasks} from '../../ducks/reducer'
import {
  Back,
  EditBox,
  Main,
  EditInput,
  EditButton,
  Subject,
  Date,
  EditWrap
} from "../todos/TodoStyles";
import Radio from "@material-ui/core/Radio";
import TimePicker from "react-time-picker";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import moment from "moment";

class EditTask extends React.Component {
  state = {
    edit: false,
    calendarAdd: false,
    checked: { color: "blue" },
    priority: 4,
    selectedDay: '',
    time: '9:00',
    input: '',
    description: ''
  };

  componentDidMount = () => {
    const {todo} = this.props
    if(todo.time){
      var time = todo.time
    } else {
      time = this.props.time
    }
    let newTime = moment(time, 'h:mm A').format('HH:mm')
    todo.length > 0 ?
    // let day = moment(this.props.selectedDay).format('YYYY-MM-DD')  
      this.setState({selectedDay: this.props.selectedDay, input: todo.task, time: newTime, priority: todo.priority})
    :
    this.setState({selectedDay: this.props.selectedDay, time: newTime })
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
    console.log( priority)
    var day = this.state.selectedDay;
    var time = this.state.time;
    let newDay = moment(day).format("YYYY-MM-DD");
    let newTime = moment(time, "h").format("h:mm A");
    if(input.length > 0){
     var task = input
    } else {
      task = this.props.todo.task
    }
    axios
      .put(`/api/tasks/update/${id}`, {
        task,
        time: newTime,
        date: newDay,
        priority,
        description,
      })

      .then(res => {
        this.props.getTasks(res.data)
      });
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {input, selectedDay, time, description, priority} = this.state
    const FORMAT = "M/D/YYYY";
    const { todo } = this.props;

console.log(this.props)
    return (
      <EditBox >

        <Back onClick={this.props.toggle}>{`<< Back`}</Back>
        <EditInput
              className="card-header"
              onChange={e => this.handleChange(e)}
              name="input"
              placeholder="Task name.."
              value={this.state.input}
            />
            <hr />
        {this.state.edit ? (
          <Main>
           
            <Subject
              
              aria-label="Type:"
            >
              <span className="type">
                Job Prep
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={this.state.priority === 1}
                  type="radio"
                  name="job prep"
                  value={1}
                />{" "}
              </span>
              <span className="type">
                Practice Code
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={this.state.priority === 2}
                  type="radio"
                  name="practice"
                  value={2}
                />{" "}
              </span>
              <span className="type">
                Portfolio{" "}
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={this.state.priority === 3}
                  name="portfolio"
                  value={3}
                />
              </span>
              <span className="type">
                Other{" "}
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={this.state.priority === 4}
                  name="other"
                  value={4}
                />
              </span>
            </Subject>
            <EditWrap>
            <textarea onChange={(e) => this.handleChange(e)} name='description' value={todo.description ? todo.description : this.state.description} placeholder='Additional Notes... '/>

            <Date>
              {" "}
              Pick a due date:
              <DayPickerInput
               value={this.state.selectedDay}
                name="selectedDay"
                onDayChange={this.handleDayChange}
                format={FORMAT}
              />
            </Date>
            <TimePicker value={this.state.time} onChange={this.handleTime} />
            <EditButton name="Add to Calendar" onClick={this.props.id === 1 ? () => this.props.makeActivity(input, time, selectedDay, description, priority) : () => this.updateTask(todo.task_id)} />
            </EditWrap>
          </Main>
             ) : (
          <Main>
            <i className="material-icons" onClick={this.setState({edit: !this.state.edit})}>
              edit
            </i>
            <span key={todo.task_id}>{todo.task}</span>
            <span>
              Complete by:
              {this.renderDatePicker()}
            </span>
            <p>{`Notes: ${todo.description}`}</p>
           
          </Main>
        )}

      </EditBox>
    );
  }
}
const mapStateToProps = state => {
  return { allTasks: state.allTasks, todo: state.todo };
};

export default withRouter(connect(mapStateToProps, {getTasks, addTask})(EditTask));
