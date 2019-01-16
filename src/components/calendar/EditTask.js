import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {addTask, getTasks} from '../../ducks/reducer'
import {
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
    selectedDay: moment().format('YYYY-MM-DD'),
    time: '09:00',
    input: '',
    description: ''
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps !== this.props){
      this.setState(this.props)
    }
  }
  componentDidMount = () => {
    console.log(this.state)
    const {todo} = this.props
    if(todo.time){
      var time = todo.time
    } else {
      time = this.state.time
    }
    let newTime = moment(time, 'h:mm A').format('HH:mm')
    if(todo.task ){
      var task = todo.task
    } else {
      task = ''
    }
    
    if(todo.priority){
     var priority = todo.priority
    } else {
      priority = this.state.priority
    }
      this.setState({selectedDay: this.props.selectedDay, input: task, time: newTime, priority: priority})
  
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
    this.setState({ selectedDay: moment(e).format('YYYY-MM-DD') });
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
  

 
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.state, this.props)
    const {input, selectedDay, time, description, priority} = this.state
    const FORMAT = "M/D/YYYY";
    const { todo } = this.props;


    return (
          <>
          
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
            <EditInput
              className="card-header"
              onChange={e => this.handleChange(e)}
              name="input"
              placeholder="Task name.."
              value={this.state.input}
            />
            <textarea onChange={(e) => this.handleChange(e)} name='description' value={todo.description ? todo.description : this.state.description} placeholder='Additional Notes... '/>

            <Date>
              {" "}
              Pick a due date:
              <DayPickerInput
               value={selectedDay}
                name="selectedDay"
                onDayChange={this.handleDayChange}
                format={FORMAT}
              />
            </Date>
            <TimePicker value={this.state.time} onChange={this.handleTime} />
          
            </EditWrap>
          </Main>
          
        <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
 
  <EditButton name='Cancel' onClick={this.props.toggle}/>
  <EditButton name="Add to Calendar" onClick={todo.task_id ? () => this.props.save(input, time, selectedDay, description, priority, todo.task_id ) : () => this.props.makeActivity(input, time, selectedDay, description, priority)} /></div>
</>
    );
  }
}
const mapStateToProps = state => {
  return { allTasks: state.allTasks, todo: state.todo };
};

export default withRouter(connect(mapStateToProps, {getTasks, addTask})(EditTask));
