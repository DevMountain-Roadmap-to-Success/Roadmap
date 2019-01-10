import React, { Component } from "react";
import {withRouter} from 'react-router'

//redux
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";

//components and styles
import "./Dashboard.css";
import Header from "./Header";
import TodoList from "./todos/TodoList";
import Weather from "./widgets/Weather";
import Dashboard from 'react-dazzle'
// import Trivia from './Trivia'

// const PlayGround = styled(Repl)`
//   width: 800px;
//   height: 400px;
//   margin-left: 0;
//   margin-top: 0;
//   border-radius: 2px;
//   /* box-shadow: 0px 1px 1px 0.5px rgb(200, 198, 190); */
// `;


class UserDashboard extends Component {
 
 
  render() {
    return (
      <div className="dashboard_main">
        <Header
        {...this.props}
          justifyContent="unset"
        >
          <h1>Roadmap Dashboard</h1>
         
        </Header>
      <Dashboard/>
        <TodoList toggleEdit={this.toggleEdit} />
        {/* <Trivia /> */}
        <Weather/>
      

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
