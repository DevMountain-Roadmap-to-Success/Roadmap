import React from "react";
import styled from 'styled-components'
import closeIcon from '../assets/close.png'
// const Todo = styled.div`
//   display: flex;
  
// `
const List = styled.li `
    font-size: 16px;

`



const Todo = (props) => {
  console.log(props)
  return (
    <div>
      {props.render }

    </div>
   
  )
}


export default Todo