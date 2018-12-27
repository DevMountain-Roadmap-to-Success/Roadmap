import React, { Component } from "react";
import Todo from './functional/Todo'
import Input from './functional/Input'
import styled from 'styled-components'


const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 80%;
    margin-top: 10%;
` 
const TaskWrapper = styled.div`
    input {
      width: 80%;
      height: 20px;
      font-size: 18px;
      font-family: 'Indie Flower';
      border: none;
      background-color: transparent;
      @media(max-width: 1200px){
        font-size: 15px;
      }

    }
    button {
      background-color: transparent;
      border: none;

    }
    
`
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    };
  }

 
  render() {
    console.log(this.props.children)
    return (
      <Form >
        <TaskWrapper >
          <Input
          name="task"
          placeholder="Stuff I need to do today"
          value={this.props.task}
          onChange={this.props.onChange}
        />
        <button onSubmit={() => this.props.onSubmit(this.props.task)}>+</button>
        </TaskWrapper>
        <Todo {...this.props}>
           {this.props.children}
         </Todo>
      </Form>
    );
  }
}

export default TodoForm;
