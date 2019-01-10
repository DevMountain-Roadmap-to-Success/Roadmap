import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable';
import Iframe from 'react-iframe';
import styled from "styled-components";
import Header from './Header';
import {connect} from 'react-redux';
import {getPosition} from './../ducks/reducer';
import Flashcard from './Flashcard';


const Div = styled.div`
Div{
  display: flex;
width: 100vw;
}

.box{
  display:flex;
  height: 470px;
  width: 670px;
  background-color: black;
  border-radius: 5px;
}

.box2{
  display:flex;
  height: 550px;
  width: 1050px;
  background-color: white;
  border-style: solid;
  border-width: 20px;
  border-color: black;
  border-radius: 5px;
}

.frame{
  margin-left: 35px;
  margin-top: 35px;
}

.gauntlet{
  margin-left: 5px;
  margin-top: 30px;
}

h1{
  margin-left: 220px;
  margin-top: 10px;
  color: white;
}
h2{
  display:flex;
  justify-content: space-between;
  margin-left: -190px;
  margin-top: 445px;
  color: white;
}

.gaunt{
  margin-left: 440px;
  margin-top: 10px;
  color: black;
  font-weight: bold;
  font-size: 25px;
}
.gaunt2{
  display:flex;
  justify-content: space-between;
  margin-left: -165px;
  margin-top: 480px;
  color: black;
}
`

class JobPrep extends Component {
  constructor() {
    super();
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      0:{}
     
    }

    this.handleDrag = this.handleDrag.bind(this);

  };

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });

    console.log(e.target.id, 
      {x: x, y: y,},
      {x: x + ui.deltaX, y: y + ui.deltaY,},
      {x: ui.lastX + ui.deltaX, y: ui.lastY + ui.deltaY,},
      
      )

  }

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
  }
  


  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    return (
      <>
      <Header/>
      <Div className="page">

      <Flashcard />

        {/* <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:25, y:25}}
        grid={[10, 10]}
        >
          <div className="box" id={0}>
          <h1 id={0}>React / Node Interview Questions</h1>
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="600px"
        height="400px"
        />
        <h2 id={0}>Click Border to Drag</h2>
        </div>
      </Draggable>

      <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:730, y:-445}}
        grid={[10, 10]}

        >
          <div className="box" id={1}>
          <h1 id={1}>React / Node Interview Question</h1>
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="600px"
        height="400px"
        />
        <h2 id={1}>Click Border to Drag</h2>
        </div>
      </Draggable>

      <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:25, y:-430}}
        grid={[10, 10]}

        >
          <div className="box">
          <h1>React / Node Interview Question</h1>
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="600px"
        height="400px"
        />
        <h2>Click Border to Drag</h2>
        </div>
      </Draggable>



      <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:25, y:-420}}
        grid={[10, 10]}

        >
          <div className="box2">
          <h1 className="gaunt">Quiz Yourself</h1>
          
        <Iframe className="gauntlet"
        url="https://gauntlet.surge.sh"
        width="1000px"
        height="450px"
        />
        <h2 className="gaunt2">Click Borders to Drag</h2>
        </div>
      </Draggable> */}

        {/* <iframe src="https://quizlet.com/350088308/flashcards/embed" height="500" width="100%" style="border:0"></iframe> */}



      </Div>
      </>
    );
  }
}


const mapDispatchtoProps = {
  getPosition
}

const mapStatetoProps = (state) => {
  return {
    position: state.position
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(JobPrep);
