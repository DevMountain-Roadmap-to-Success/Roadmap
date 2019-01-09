import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components'

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
border: 1px solid black;
width: 300px;
height: 400px;

.button_1{
  position: fixed;
  top:10px;
}
.answer_btn{
  position: fixed;
  top: 250px;
}
`

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      toggle: false
    };
  }
  getQuestion = () => {
    axios.get("/api/trivia").then(res => {
      console.log(res.data[0].question, res.data[0].answer);
      this.setState({
        question: res.data[0].question,
        answer: res.data[0].answer,
        toggle: false
      });
    });
  };
  getAnswer = () => {
    this.setState({toggle: !this.state.toggle});
  };
  render() {
    return (
      <Main>
        <button className="button_1" onClick={this.getQuestion}>Get Trivia Question</button>
        <h1>{this.state.question}</h1>
        <button className="answer_btn" onClick={this.getAnswer}>Get Answer</button>
        {this.state.toggle === true ? <h3>{this.state.answer}</h3> : null}
      </Main>
    );
  }
}

export default Trivia;
