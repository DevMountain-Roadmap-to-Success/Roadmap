import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Back, EditBox, Main, EditInput, EditButton, Subject, Date, RadioButton } from './TodoStyles'
import Radio from '@material-ui/core/Radio';
import TimePicker from 'react-time-picker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {withRouter} from 'react-router'


const theme = createMuiTheme({
    primary: "rgb(255, 87, 87)" , // Purple and green play nicely together.
    secondary:  "rgb(244, 247, 113)" , // This is just green.A700 as hex.
    default: 'rgb(111, 253, 142)', //'rgb(111, 253, 142)'
  
});
const theme2 = createMuiTheme({
  primary:'rgb(111, 253, 142)' , // Purple and green play nicely together.
  secondary:  "rgb(244, 247, 113)" , // This is just green.A700 as hex.


});




class EditTask extends React.Component {
    state = {
       edit: false,
      calendarAdd: false,
      checked: {color: 'blue'}
     }

   

    render(){
      console.log(this.props.id, this.props, Radio )

      const FORMAT = 'M/D/YYYY';
      const { selectedDay } = this.props;
      let { tasks}  = this.props
      let taskInfo = tasks.map((task ) => {
        if(task.task_id === this.props.id){
      return (
             <React.Fragment key={this.props.id}>
              <Back onClick={this.props.toggle}>{`<< Back`}</Back>
             
              <Main >
             { task.complete_by && task.task.length > 0 && !this.state.edit ?
             <div>
             <span key={task.task_id}>{task.task}</span>
              <span>{`Complete by: ${task.complete_by}`}</span> 
              <p>{`Notes: ${task.description}`}</p>
            </div>
              :
              <div>
                {/* <span> Would you like to add this to calendar? <Radio name='addToCalendar' onClick={(e) => this.props.onSelect(e)}/> </span> */}
                 <EditInput className='card-header' onChange={(e) => this.props.onChange(e)} name='task'  placeholder='Task name..' value={this.props.task}/>
                <hr/>
                <Subject
                onChange={(e) => this.props.selectSubject(e)}
                aria-label='Type:'>
                <MuiThemeProvider theme={theme}>
                <span className='type'>Job Prep<Radio  checked={this.props.priority === 1}  type='radio' name='job prep' value={1}  /> </span>
                <span className='type'>Practice Code<Radio checked={this.props.priority === 2}  type='radio' name='practice' value={2} /> </span>
                </MuiThemeProvider>
                <MuiThemeProvider theme={theme2}>
                <span className='type'>Portfolio <Radio checked={this.props.priority === 3}  name='portfolio' value={3} /></span>
                <span className='type'>Other <Radio  checked={this.props.priority === 4}  name='other' value={4} /></span>
                </MuiThemeProvider>
                </Subject>
                {/* <textarea onChange={(e) => this.props.onChange(e)} name='description' value={this.props.description} placeholder='Additional Notes... '/> */}
                <Date>Pick a due date:
                <DayPickerInput name='selectedDay' onDayChange={this.props.handleDayPicker} value={selectedDay} format={FORMAT} />
                </Date>

                <TimePicker value={this.props.time} onChange={this.props.handleTime}/> 
                </div>
              }

             </Main> 
                 <EditButton name='Add to Calendar' onClick={this.props.onClick}/>
               
             </React.Fragment>
        
            )
          } 
        })

   
    return (

      <EditBox >{taskInfo}</EditBox>
    );
  }
}


export default withRouter(EditTask)