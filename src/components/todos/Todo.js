import React from "react";
import {List, Remove} from './TodoStyles'



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
        onDoubleClick={() => props.editTask(task.task_id, task.task)}
        key={task.task_id}
        className={task.complete ? "todo completed" : "todo"}
      >
        {task.task}
      </div>
      <Remove onClick={() => props.deleteTodo(task.task_id)}>X</Remove>
    
    </List>
  );
};
export default Todo;
