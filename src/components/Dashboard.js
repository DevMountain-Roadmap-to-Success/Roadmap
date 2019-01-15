import React, { Component } from "react";
import { withRouter } from 'react-router'

//redux
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
// import { getPosition } from './../ducks/reducer';

//components and styles
import "./Dashboard.css";
import styled from 'styled-components';
import Header from "./Header";
import TodoList from "./todos/TodoList";
import Weather from "./widgets/Weather";
import Dashboard from 'react-dazzle'
import Flashcard from './Flashcard';
import Trivia from './Trivia'
// import Gauntlet from './functional/Gauntlet';
import Twitter from './widgets/Twitter'
import { TwitterTweet } from './widgets/Twitter'
import Grid from '@material-ui/core/Grid';
import search from '../assets/search.png'

const Div = styled.div`
width: 100vw;
height: 100vh;
display:flex;
overflow:scroll;
`


// const Flashcard1 = styled(Flashcard)`
// position:absolute;
// `

//Draggable styling
const Drag = styled.div`
  display:flex;
  justify-content: space-around;
  /* width: ${props => props.width}; */
`

const DragCard = styled.div`
  display:flex;
  /* background-color:red; */
`

const Gaunt = styled.div`
background-color:black;
`
const SearchInput = styled.input `
  width: 450px;
  text-indent: 30px;
  height: 40px;
  border-radius: 20px;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 25px;
  background-position-y: 5px;
  background-position-x: 3px;
  outline: none;
`
//declaring the needed depency for the drag and drop 
var ReactGridLayout = require('react-grid-layout');

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginRight: '3%',
  marginLeft: '3%',

}
const main = {
  display: 'flex',
  justifyContent: 'space-evenly',
  height: '1000px',
  width: '100%'
}
const margin = {
  marginBottom: '3%'
}
class UserDashboard extends Component {




  render() {
    //draggable props
    const { compact } = this.props
    //declaring where everything is positioned. 
    var layout = [
      { i: "todo", x: .5, y: 0, w: 4, h: 2.8, isResizable: false, },
      { i: "flashcard", x: 14, y: 0, w: 4, h: 2, isResizable: false },
      { i: "weather", x: 18, y: 0 , w: 12.5, h: 2, isResizable: false, },
      // { i: "gauntlet", x: 0, y: 3.5, w: 19.3, h: 5.4, isResizable: false, },
      { i: "twitter", x: 18, y:0, w: 12.5, h: 3.44, isResizable: false },
      { i: "trivia", x:.5, y: 2, w: 4, h: 1, isResizable: false },
      { i: "search", x:14.5, y: 3.5, w: 4, h: 2, isResizable: false },
    ]
    return (
      <div className="dashboard_main">
        <Header
          {...this.props}
          justifyContent="unset"
        >
          <h1>Roadmap Dashboard</h1>
        </Header>


        {/* <Div> */}
          {/* <Dashboard /> */}

          {/* <ReactGridLayout className="layout" layout={layout}
            style={{ position: `relative` }}
            cols={36}
            rows={2}
            width={2000}
            height={400}
            preventCollision={true}
            compactType={compact ? 'horizontal' : null}
            autoSize={true}
            // margin={[.5, 1]}
          > */}
  <Grid container spacing={40} style={main}>
            <Grid item xs={2} style={styles}>
            <TodoList style={margin} toggleEdit={this.toggleEdit} />
            <Weather />

            </Grid>
             
            <Grid item xs={3} style={styles}>
            <TwitterTweet id={'1076129376679411714'} />
            <SearchInput  
            placeholder='Search...'/>
          </Grid>
           
<Grid item xs={2} style={styles} >
<Twitter toggleEdit={this.toggleEdit} />
<Trivia />

</Grid>
<Grid item xs={3}>

            </Grid>      

            {/* components before dragability was added */}



            {/* <Weather/>
        <Flashcard1 /> */}

          
          {/* </ReactGridLayout> */}
        {/* </Div> */}
        </Grid>


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
