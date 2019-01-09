import React, { Component } from "react";
import axios from "axios";

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
      console.log(res.data[0].question);
      this.setState({
        question: res.data[0].question,
        answer: res.data[0].answer
      });
    });
  };
  getAnswer = () => {
   this.setState(!this.state.toggle)
  };
  render() {
    return (
      <div>
        <button onClick={this.getQuestion}>Get Trivia Question</button>
        <h1>{this.state.question}</h1>
        <button onClick={this.getAnswer}>Get Answer</button>
        <h3>{this.state.answer}</h3>
      </div>
    );
  }
}

export default Trivia;
