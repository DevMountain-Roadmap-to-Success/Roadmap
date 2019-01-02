import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux';
import {getTasks} from '../../ducks/reducer'
import Draggable from 'react-draggable'
import close from '../../assets/close.png'

const Div = styled.div`
  background-color: white;
   max-width: 250px;
    position: absolute;
    
   
`

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
      description: ''
    };
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    
  }
  updateTask = () => {
    const description = this.state.description
    let day = this.state.selectedDay
    day = moment().format('YYYY-MM-DD')
    console.log(description, day)
    let id = localStorage.getItem('id')
    axios.put(`/api/tasks/update/${id}`, {
      complete_by: day,
      description
    })
    .then((res) => console.log(res.data))
  }
  handleDescription = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const FORMAT = 'M/D/YYYY';
    const { selectedDay } = this.state;
    console.log(this.props)
    // let task = tasks.map((task, i) => {
      // return task
    // })
    return (
      <Draggable >
      <Div >
     {/* { task.complete_by && task.length > 0 ? */}
      <div className='card-header'>
      {/* <i class="fas fa-star"></i>{`${task.task.toUpperCase()} complete by: ${task.complete_by}`}  */}
      </div> : 
      <div className='card-body'>
        <textarea placeholder='Notes...' onChange={this.handleDescription}/>
        {selectedDay && <p>Complete by:{selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Pick a day</p>}
        <DayPickerInput onDayChange={this.handleDayChange} format={FORMAT} placeholder='M/D/YYYY'/>
        <button className='btn btn-primary'onClick={this.updateTask}>Update</button> 
     </div> 
      </Div>
      </Draggable>
    );
  }
}
const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, getTasks)(EditTask)