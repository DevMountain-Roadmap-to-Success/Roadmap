import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable';

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
      <div>
        {/* <Draggable
      grid={[25, 25]}
      defaultPosition={{x:500, y:500}}
      onDrag={this.handleDrag}
      >
        <h1>Job Prep</h1>
      </Draggable> */}


        <Draggable onDrag={this.handleDrag} {...dragHandlers}
        defaultPosition={{x:0, y:0}}
        >
          <div className="box">
          <h1>Job Prep</h1>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable>

        <Draggable onDrag={this.handleDrag} {...dragHandlers}>
          <div className="box">
          <h1>Job Prep</h1>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable>

        <Draggable onDrag={this.handleDrag} {...dragHandlers}>
          <div className="box">
          <h1>Job Prep</h1>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable>

      </div>
    );
  }
}

export default JobPrep;
