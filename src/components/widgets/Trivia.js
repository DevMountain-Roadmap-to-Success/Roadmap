import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import MdArrowRoundUp from 'react-ionicons/lib/MdArrowRoundUp'


const PlayTrivia = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  height: 250px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  justify-content: 'center';
  min-height: 150px;
  max-height: auto;
  width: 350px;
  border-radius: 4px;
  position: relative;
  div {
    height: 60%;
    text-align: center;

  }
  
 
  #button_question, #button_answer {
    position: absolute;
    outline: none;
  } 
  #button_question {
    top: 10px;
  }
  #button_answer {
    bottom: 10px;
  }
  #button_question:hover, #button_answer:hover{
    background: rgb(122, 202, 248);
    cursor: pointer;
    border-radius: 3px;
  }
  
`

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      toggle: false,
      disabled: true
    };
  }

  getQuestion = () => {
     axios.get("/api/trivia").then(res => {
      console.log(res.data[0].question, res.data[0].answer);
      this.setState({
        question: res.data[0].question,
        answer: res.data[0].answer,
        toggle: false,
        disabled: false,
      });
    });
  };
  getAnswer = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  timer = () => {
    setTimeout(() => {
      this.setState({ disabled: true })
    }, 15000);

  }
  
  render () {

    return this.state.disabled ? (
      <PlayTrivia>
      
      <Button style={{color: 'white', border: 'white solid thin', fontSize: '22px', marginBottom: '20px'}}id='main-button' onClick={this.getQuestion}>
      Play Trivia
    </Button>
      <MdArrowRoundUp beat={true} color='red' fontSize='40px'/> 
     </PlayTrivia>
    ) : (
      <Main style={{justifyContent: 'center'}}>
         <Button id="button_question" onClick={this.getQuestion}>
      Next Question 
    </Button>
          
        <div >
        {!this.state.toggle ? ( 
             <p>{this.state.question}</p> 

         ) : (

        <p>{this.state.answer}</p> 
        )}
     </div>
  <Button  id="button_answer" onClick={this.getAnswer}>
      Give up </Button>
      {this.timer()}  
   </Main>  

    )

  }  
}

export default Trivia
