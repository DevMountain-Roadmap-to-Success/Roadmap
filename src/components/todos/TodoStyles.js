import styled from 'styled-components'
import Input from '../functional/Input'
import Button from '../functional/Button'
import Radio from '@material-ui/core/Radio'

export const RadioButton = styled.input`
  color: blue;
  background-color: blue;
  ::selection {
    color: blue;
  }
`

export const Subject = styled.div `
   display: flex;
  flex-direction: column;
   width: 25%;

   .type {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 5px;
     background-color:white;
   }
   #radio {
     fill: 'blue';
   }
`

export const EditButton = styled(Button)`
  /* position: absolute; */
  
  width: 130px;
  height: 40px;
  color: white;

`

export const UpdateButton = styled(Button)`
  width: 90px;
  height: 30px;
`


export const List = styled.div`

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

export const Remove = styled.div`
  position: absolute;
  right: 20px;
  font-size: 10px;
  cursor: pointer;
`;


export const Wrapper = styled.div`
background-color: rgba(255, 255, 255, 0.959);
  width: 350px;
  height: 400px;
  display: flex;
  background-position-x: -50px;
  background-position-y: -50px;
  box-shadow: 0px 1px 1px 0px rgb(200, 200, 200);
  border-radius: 2px;


  button {
    background-color: transparent;
    border: none;
  }
`;
export const TodoForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
  margin-top: 5%;
  font-family: "Nunito";
  overflow: scroll;
  text-align: left;

  input {
    border: none;
    background-color: transparent;
    margin-left: 10px;
    width: 250px;
  }
`;


export const Date = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const EditWrap = styled.div`
display: flex;
  flex-direction: column;
  width: 65%;
  padding: 20px;
  height: 100%;
  justify-content: space-evenly;
`


export const EditBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
   background-color: white;
  
 
  
`
export const Main = styled.main`
  height: 70%;
  display: flex;
  /* justify-content: center; */

  width: 100%;

  textarea {
    height: 80px;
  }
  p {
    font-size: 14px;
    display: flex;
    flex-direction: column;
  }
  
`
export const EditInput = styled(Input)`
  height: 30px;
  background-color: transparent;
  border-right: none;
  border-top: none;
  border-left: none;
  border-color: black;
  margin-top: 30px;
`

export const Back = styled.span`
  position: absolute;
  left: 8px;
  top: 10px;
  cursor: pointer;
`

