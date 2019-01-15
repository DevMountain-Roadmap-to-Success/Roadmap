import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import MdArrowRoundUp from 'react-ionicons/lib/MdArrowRoundUp'
import MdArrowRoundDown from 'react-ionicons/lib/MdArrowRoundDown'


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: 'center';
  height: 140px;
  border-radius: 4px;
  padding: 20px;
  position: relative;
 h1 {
   line-height: 20px;
  margin-top: 20px;
 }
  .button_1 {
    position: absolute;
    top: 20px;
    outline: none;
  }
  .button_1:hover{
    background: rgb(122, 202, 248);
    cursor: pointer;
    border-radius: 3px;
  }
  .answer_btn {
    position: absolute;
    bottom: 30px;
    outline: none;
    margin-top: 10px;
  }
  .answer_btn:hover{
    background:rgb(120, 218, 243);
    cursor: pointer;
    border-radius: 3px;
  }
`;
const MainWrapper = styled.div`

  justify-content: 'space-between';
  align-items: 'center';
  width: 'auto';
  position: relative;
  width: 350px;
  height: 220px;
  background-color: white;
border-radius: 4px;
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
          <Button style={{marginLeft: '90px'}}className="button_1" onClick={this.getQuestion}>
            Get Trivia Question
          </Button>
        <Main>
          {!this.state.question  ? 
          <MdArrowRoundUp beat={true} color='red' fontSize='34px'/>
          : <h1>{this.state.question}</h1> }
          {!this.state.toggle && this.state.question ? <MdArrowRoundDown beat={true} color='red' fontSize='34px'/> : <h3>{this.state.answer}</h3> }
        </Main>
          <Button style={{marginLeft: '120px'}} className="answer_btn" onClick={this.getAnswer}>
            Get Answer
          </Button>
      </MainWrapper>
    );
  }
}

export default Trivia
