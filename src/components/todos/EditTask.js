import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components'




const Div = styled.div`
   max-width: 250px;
   .card-header, .card-body {
   display: flex;
   flex-direction: column;
   }
    
   button {
     background-color: blue;
   }
`

const EditTask = (props) => {
  
    const FORMAT = 'M/D/YYYY';
    const { selectedDay } = props;
  let { tasks}  = props
    console.log(props.tasks, props)
    return (

      <Div >
      <span onClick={props.toggle}>{`<< Back`}</span>
      <div className='card-header'>
      <i className="fas fa-star"></i>{tasks[0].task}
     { tasks[0].complete_by && tasks[0].task.length > 0 ?
      `complete by: ${tasks[0].complete_by}` : null }
      </div> 
      <div className='card-body' >
        <textarea
        value={tasks[0].description} 
        placeholder='Notes...'
        onChange={props.onChange} 
        name='description'/>
        {selectedDay && <p>Complete by:{selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Pick a day</p>}
        <DayPickerInput onDayChange={() => props.handleDayChange(selectedDay)} format={FORMAT} placeholder='M/D/YYYY'/>
        <button className='btn btn-primary' onClick={() => props.update(tasks[0].description, tasks[0].task)}>Update</button> 
     </div> 
      </Div>

    );
  }


export default EditTask