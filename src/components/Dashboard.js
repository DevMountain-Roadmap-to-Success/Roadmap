import React, { Component } from "react";
import { withRouter } from 'react-router'

//redux
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import { getPosition } from './../ducks/reducer';

//components and styles
import "./Dashboard.css";
import styled from 'styled-components';
import Header from "./Header";
import TodoList from "./todos/TodoList";
import Weather from "./widgets/Weather";
import Dashboard from 'react-dazzle'
import Flashcard from './Flashcard';
// import Trivia from './Trivia'
import Gauntlet from './functional/Gauntlet';

// const PlayGround = styled(Repl)`
//   width: 800px;
//   height: 400px;
//   margin-left: 0;
//   margin-top: 0;
//   border-radius: 2px;
//   /* box-shadow: 0px 1px 1px 0.5px rgb(200, 198, 190); */
// `;

const Div = styled.div`
width: 100vw;
height: 100vh;
display:flex;
overflow:scroll;
`


const Flashcard1 = styled(Flashcard)`
position:absolute;
`

//Draggable styling
const Drag = styled.div`
  display:flex;
  justify-content: space-around;
  /* background-color:red; */
`

const DragCard = styled.div`
  display:flex;
  /* background-color:red; */
`

const Gaunt = styled.div`
background-color:black;
`

//declaring the needed depency for the drag and drop 
var ReactGridLayout = require('react-grid-layout');

class UserDashboard extends Component {


  render() {
    //draggable props
    const { collision, compact } = this.props
    //declaring where everything is positioned. 
    var layout = [
      { i: "todo", x: 0, y: 0, w: 7, h: 2.8, isResizable: false, },
      { i: "flashcard", x: 14, y: 0, w: 12.5, h: 3.44, isResizable: false },
      { i: "weather", x: 7, y: 0, w: 7, h: 2.1, isResizable: false, },
      { i: "gauntlet", x: 0, y: 3.5, w: 19.3, h: 5.4, isResizable: false, },
    ]
    return (
      <div className="dashboard_main">
        <Header
          {...this.props}
          justifyContent="unset"
        >
          <h1>Roadmap Dashboard</h1>
        </Header>


        <Div>
          <Dashboard />

          <ReactGridLayout className="layout" layout={layout}
            style={{ position: `relative` }}
            cols={36}
            rows={12}
            width={2000}
            height={300}
            preventCollision={true}
            compactType={compact ? 'horizontal' : null}
            autoSize={true}
            margin={[1, 1]}
          >

            <Drag key='todo' >
            <TodoList toggleEdit={this.toggleEdit} />
            </Drag>

            <DragCard key='flashcard' className='testBox'>
              <Flashcard />
            </DragCard>

            <Drag key='weather'>
              <Weather />
            </Drag>


            <Gaunt key='gauntlet'>
              <Gauntlet />
            </Gaunt>




            {/* components before dragability was added */}

            {/* <Trivia /> */}
            {/* <Weather/>
        <Flashcard1 /> */}



          </ReactGridLayout>
        </Div>


      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,

  };
};

export default withRouter(connect(
  mapStateToProps,
  { getUser }
)(UserDashboard));
