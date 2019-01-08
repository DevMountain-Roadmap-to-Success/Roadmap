import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable';
import Iframe from 'react-iframe';

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
      <div className="page">
  


        <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:0, y:0}}
        >
          <div className="box">
          <h1>Job Prep</h1>
            {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
          </div>
        </Draggable>

        <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:50, y:50}}
        >
          <div className="box">
          
        <Iframe className="frame"
        url="https://quizlet.com/350088308/flashcards/embed"
        width="700px"
        height="500px"
        />
        </div>
      </Draggable>



        {/* <iframe src="https://quizlet.com/350088308/flashcards/embed" height="500" width="100%" style="border:0"></iframe> */}



      </div>
    );
  }
}

export default JobPrep;
