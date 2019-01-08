import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable';
import Iframe from 'react-iframe';
import styled from "styled-components";
import Header from './Header';

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
}

.frame{
  margin-left: 35px;
  margin-top: 35px;
}

h1{
  margin-left: 250px;
  margin-top: 10px;
  color: white;
}
h2{
  display:flex;
  justify-content: space-between;
  margin-left: -180px;
  margin-top: 445px;
  color: white;
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
      controlledPosition: {
        x: -400, y: 200
      }
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
    // console.log(this.state.deltaPosition);   

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
  


        {/* <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:0, y:0}}
        >
          <div className="box">
          <h1>Job Prep</h1>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable> */}

        <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:25, y:25}}
        grid={[25, 25]}
        >
          <div className="box">
          <h1>Click Border to Drag</h1>
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="600px"
        height="400px"
        />
        <h2>React / Node Interview Questions</h2>
        </div>
      </Draggable>

      <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:730, y:-445}}
        grid={[25, 25]}

        >
          <div className="box">
          <h1>Click Border to Drag</h1>
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="600px"
        height="400px"
        />
        <h2>React / Node Interview Questions</h2>
        </div>
      </Draggable>



        {/* <iframe src="https://quizlet.com/350088308/flashcards/embed" height="500" width="100%" style="border:0"></iframe> */}



      </Div>
      </>
    );
  }
}

export default JobPrep;
