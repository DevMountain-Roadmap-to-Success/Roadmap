import React, { Component } from "react";
import "./Dashboard.css";
import Header from "./Header";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import axios from "axios";
// import Repl from "./widgets/Playground";
import TodoList from "./TodoList";
import EditTask from "./functional/EditTask";
import Weather from "./widgets/Weather";
// import ReactLoading from 'react-loading'
import styled from 'styled-components'
import {withRouter} from 'react-router'

const Dashboard = styled.div `
display: grid;
grid-template-columns: auto auto auto;
grid-row-gap: 30px;
  padding: 20px;

`
const WeatherWidget = styled(Weather)`
  grid-column-start: 1;
  grid-column-end: 2;
  

`
// const PlayGround = styled(Repl)`
//   width: 800px;
//   height: 400px;
//   margin-left: 0;
//   margin-top: 0;
//   border-radius: 2px;
//   /* box-shadow: 0px 1px 1px 0.5px rgb(200, 198, 190); */
  

// `;
const Box = styled.div`
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.959);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

class UserDashboard extends Component {
  state = {
    first: "H",
    last: "I",
    open: false,
    header: false,
    dropdown: false,
    description: "",

  };

 
  deleteAccount = () => {
    axios.delete("/api/account").then(() => {
      this.props.history.push("/login");
    });
  };


  handleStateChange = state => {
    this.setState({ open: state.isOpen });
  };

  toggleEdit = () => {
    this.setState(prevState => {
      return {
        editTask: !prevState.editTask
      };
    });
  };
  renderEditTask = () => {
    if (this.state.editTask) {
      return (
        <EditTask
          name="description"
          description={this.state.description}
          onChange={this.handleChange}
          tasks={this.state.tasks}
        />
      );
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  render() {
    return (
      <div className="dashboard_main">
        <Header
        {...this.props}
          justifyContent="unset"
        >
          <h1>Roadmap Dashboard</h1>
         
        </Header>
      <Dashboard>
        <TodoList toggleEdit={this.toggleEdit} />
        {this.renderEditTask()}
         <Box draggable={true} >
          {/* <ReactLoading type='spokes' color='black'/> */}
          </Box>
        <WeatherWidget/>
        <div className='droptarget' style={{width:'400px', height: '400px', backgroundColor: 'white'}}></div>
        </Dashboard>
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
