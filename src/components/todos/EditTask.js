import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Back, EditBox, Main, EditInput, EditButton } from './TodoStyles'
import { Radio } from 'react-bootstrap'
import TimePicker from 'react-time-picker'
class EditTask extends React.Component {
    state = {
       edit: false,
      calendarAdd: false
     }

    render(){
      console.log(this.props.id, this.props )

      const FORMAT = 'M/D/YYYY';
      const { selectedDay } = this.props;
      let { tasks}  = this.props
      let taskInfo = tasks.map((task ) => {
        if(task.task_id === this.props.id){
      return (
             <>
              <Back onClick={this.props.toggle}>{`<< Back`}</Back>
              <EditButton name={this.state.edit ? 'Update' : 'Edit'} onClick={this.state.edit? this.props.update : () => this.setState({edit: !this.state.edit})}/>
              <Main >
             { task.complete_by && task.task.length > 0 && !this.state.edit ?
             <div>
             <span>{task.task}</span>
              <span>{`Complete by: ${task.complete_by}`}</span> 
              <p>{`Notes: ${task.description}`}</p>
            </div>
              :
              <div>
                <span> Would you like to add this to calendar? <Radio name='addToCalendar' onSelect={this.props.handlePicker}/> </span>
                 <EditInput className='card-header' onChange={(e) => this.props.onChange(e)} name='task'  placeholder='Task name..' value={this.props.task}/>
              <span>Pick a due date:
                </span>
                <DayPickerInput name='selectedDay' onDayChange={() => this.props.handlePicker(selectedDay)} format={FORMAT} />
                <hr/>
                <textarea onChange={this.props.onChange} name='description' value={this.props.description} placeholder='Additional Notes... '/>
                <TimePicker /> 
                </div>
              }
               
             </Main> 
             </>
        
            )
          } 
        })

   
    return (

      <EditBox >{taskInfo}</EditBox>
    );
  }
}


export default EditTask