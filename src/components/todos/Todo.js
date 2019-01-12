import React from "react";
import {List, Remove} from './TodoStyles'
import {connect} from 'react-redux'
import {addTask} from '../../ducks/reducer'

const Todo = (props) => {
  let {task} = props

  console.log(props);
  return (
    <List>
      <div
        onClick={() => props.toggle(task.task_id)}
        className={task.complete ? "checkbox toggle" : "checkbox"}
        />
      <div
        style={{width: '55%', wordWrap: 'break-word'}}
        // onDoubleClick={() => props.editTask(task.task_id, task.task)}
        key={task.task_id}
        className={task.complete ? "todo completed" : "todo"}
      >
        {task.task}
      </div>
      <Remove onClick={() => props.deleteTodo(task.task_id)}>X</Remove>
    
    </List>
  );
};
const mapStateToProps = state => {
  return { 
    todo: state.todo,
    allTasks: state.allTasks
  }
}
export default connect(mapStateToProps, {addTask})(Todo)
