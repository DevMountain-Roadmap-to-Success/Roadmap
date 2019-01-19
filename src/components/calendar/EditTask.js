import React from "react";
import {unmountComponentAtNode} from 'react-dom'
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
    date: moment().format('YYYY-MM-DD'),
    time: '09:00',
    input: '',
    description: ''
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.task !== this.props.todo.task){
      this.setState({date: this.props.selectedDay,  time: moment(this.props.time, 'h:mm A').format('HH:mm'), })
      
    }
  }
  componentDidMount = () => {
    console.log( this.props.time)
    const {todo} = this.props
    if(todo){
    this.setState({ input: todo.task, priority: todo.priority,  decription: todo.description })
  } else {
    return;
    }
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
    this.setState({ date: moment(e).format('YYYY-MM-DD') });
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
    const {input, date, time, description, priority} = this.state
    const FORMAT = "M/D/YYYY";
    const { todo, save, create, id} = this.props;


    return (
          <>
          
          <Main>
           
            <Subject {...this.props} >
              
              <span className="type">
                Job Prep
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={priority === 1}
                  type="radio"
                  name="job prep"
                  value={1}
                />{" "}
              </span>
              <span className="type">
                Practice Code
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={priority === 2}
                  type="radio"
                  name="practice"
                  value={2}
                />{" "}
              </span>
              <span className="type">
                Portfolio{" "}
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={priority === 3}
                  name="portfolio"
                  value={3}
                />
              </span>
              <span className="type">
                Other{" "}
                <Radio
                onChange={e => this.selectSubject(e)}
                  checked={priority === 4}
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
              value={input}
            />
            <textarea onChange={(e) => this.handleChange(e)} name='description' value={todo.description ? todo.description : description} placeholder='Additional Notes... '/>

            <Date>
              {" "}
              Pick a due date:
              <DayPickerInput
               value={date}
                name="date"
                onDayChange={this.handleDayChange}
                format={FORMAT}
              />
            </Date>
            <TimePicker value={time} onChange={this.handleTime} />
          
            </EditWrap>
          </Main>
          
        <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
 
  <EditButton name='Cancel' onClick={this.props.toggle}/>
  <EditButton name="Add to Calendar" onClick={id > 2 ? (e) => save(input, time, date, description, priority, id, e) : (e) => create(input, time, date, description, priority, e) } /></div>
</>
    );
  }
}
const mapStateToProps = state => {
  return { allTasks: state.allTasks, todo: state.todo };
};

export default withRouter(connect(mapStateToProps, {getTasks, addTask})(EditTask));
