import React, { Component } from "react";
import Todo from './Todo'
import Button from './functional/Button'
import styled from 'styled-components'

const Form = styled.form`
    width: 250px;
    height: 300px;
    background-color: white;
    flex-direction: column;
` 
const TaskWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;



    input {
      width: 80%;
      height: 40px;
      font-size: 18px;
    }
`



class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    console.log(this.state.task)
    e.preventDefault();
    this.props.onSubmit(
      this.state.task
    );
    this.setState({ task: "" });
  }

  render() {
    console.log(this.props.children)
    return (
      <Form onSubmit={this.handleSubmit}>
        <TaskWrapper >
          <input
          name="task"
          placeholder="What do you need to do?"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit} name='Add'/>
        <Todo render={this.props.children}/>
        </TaskWrapper>
      </Form>
    );
  }
}

export default TodoForm;
