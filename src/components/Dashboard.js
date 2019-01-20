import React, { Component } from "react";
import { withRouter } from "react-router";
import pic from '../assets/profile.png'
//redux
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import axios from 'axios'

//components and styles
import "./Dashboard.css";
import styled from "styled-components";
import Header from "./Header";
import TodoList from "./todos/TodoList";
import Weather from "./widgets/Weather";
import Flashcard from "./widgets/Flashcard";
import Trivia from "./widgets/Trivia";
// import Gauntlet from './functional/Gauntlet';
import { TwitterTimelineEmbed } from "react-twitter-embed";



const GridBox = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
  grid-gap: 20px;
  /* @media(max-width: 1100px){
    display: flex;
    flex-wrap: wrap;
  } */
`
const Grid = styled.div``

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-evenly',
  alignItems: "center",
  marginRight: "3%",
  marginLeft: "3%"
};
const StyledFlashcard = styled(Flashcard) `
    height: 600px;
    width: 400px;

`
class UserDashboard extends Component {
  state = {
    showModal: false,
  image: pic,
  full_name: '',
  cohort: null }
  componentDidMount = () => {
   return this.checkUser()
  }

  checkUser = () => {
    axios.get("/auth/session").then(res => {
      return this.props.getUser(res.data);
     });
  }
  
  render() {
    console.log(this.props)
    //draggable props
    //declaring where everything is positioned.
    // var layout = [
    //   { i: "todo", x: 0.5, y: 0, w: 4, h: 2.8, isResizable: false },
    //   { i: "flashcard", x: 14, y: 0, w: 4, h: 2, isResizable: false },
    //   { i: "weather", x: 18, y: 0, w: 12.5, h: 2, isResizable: false },
    //   // { i: "gauntlet", x: 0, y: 3.5, w: 19.3, h: 5.4, isResizable: false, },
    //   { i: "twitter", x: 18, y: 0, w: 12.5, h: 3.44, isResizable: false },
    //   { i: "trivia", x: 0.5, y: 2, w: 4, h: 1, isResizable: false },
    //   { i: "search", x: 14.5, y: 3.5, w: 4, h: 2, isResizable: false }
    // ];
    return (
      <div >
        <Header justifyContent="unset">
          <h1>Roadmap Dashboard</h1>
        </Header>

        <div className="dashboard_main">
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
        <GridBox  >

          <Grid  style={styles}>
            <TodoList  toggleEdit={this.toggleEdit} />
            <Weather  />
          </Grid>

          <Grid item xs={3} style={styles}>
            <StyledFlashcard />
          </Grid>

          <Grid item xs={3} style={styles}>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="javascript_fan"
              options={{ height: 400, width: '350px', marginBottom: '30px' }}
              />

          <Grid item >
            <Trivia />
         </Grid>
              </Grid>
          </GridBox>
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUser }
  )(UserDashboard)
);
