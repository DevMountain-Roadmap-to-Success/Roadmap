import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  width: 300px;
  height: 400px;
  border-radius: 4px;
  padding: 20px;

  .button_1 {
    position: fixed;
    top: 10px;
    outline: none;
  }
  .button_1:hover{
    background: rgb(122, 202, 248);
    cursor: pointer;
    border-radius: 3px;
  }
  .answer_btn {
    position: fixed;
    top: 250px;
    outline: none;
  }
  .answer_btn:hover{
    background: rgb(122, 202, 248);
    cursor: pointer;
    border-radius: 3px;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    return (
      <MainWrapper>
        <Main>
          <button className="button_1" onClick={this.getQuestion}>
            Get Trivia Question
          </button>
          <h1>{this.state.question}</h1>
          <button className="answer_btn" onClick={this.getAnswer}>
            Get Answer
          </button>
          {this.state.toggle === true ? <h3>{this.state.answer}</h3> : null}
        </Main>
      </MainWrapper>
    );
  }
}

export default Trivia;
