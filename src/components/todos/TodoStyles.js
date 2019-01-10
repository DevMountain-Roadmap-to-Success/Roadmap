import styled from 'styled-components'
import Input from '../functional/Input'
import Button from '../functional/Button'

export const EditButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 70px;
  height: 20px;
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




export const EditBox = styled.div`
  background-color: white;
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
   
 
  
`
export const Main = styled.main`
  height: 70%;
  display: flex;
  flex-direction: column;
  width: 70%;

  textarea {
    height: 100px;
  }
  p {
    font-size: 14px;
    display: flex;
    flex-direction: column;
  }
  
`
export const EditInput = styled(Input)`
  height: 30px;
`

export const Back = styled.span`
  position: absolute;
  left: 8px;
  top: 10px;
`
