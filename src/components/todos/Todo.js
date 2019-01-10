import React from "react";
import styled from "styled-components";

const List = styled.div`

  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .completed {
    text-decoration-color: rgb(105, 105, 105);
    text-decoration-line: line-through;
    color: #e7e7e7;
  }
  .todo {
    margin-left: 20px;
    font-size: 20px;
    cursor: pointer;
  }
  .checkbox {
    border-radius: 50%;
    border: solid 1px #e7e7e7;
    width: 15px;
    height: 15px;
    margin-left: 20px;
    cursor: pointer;
  }
  .toggle {
    background: #ebd8d8;
  }
`;

const Remove = styled.div`
  position: absolute;
  right: 20px;
  font-size: 10px;
  cursor: pointer;
`;

const Div = styled.div`
   max-width: 250px;
    position: absolute;
    
   button {
     background-color: blue;
   }
`



const Todo = (props) => {
  let {task} = props
  console.log(task);
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
