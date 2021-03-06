import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Resources from "./components/Resources";
import JobPrep from "./components/JobPrep";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/calendar/Calendar";
import LandingPage from "./components/LandingPage";
import Sandbox from "./components/functional/Sandbox";
import Home from "./components/Home";
import axios from "axios";
import EditProfile from "./components/profile/EditProfile";
import {withRouter} from 'react-router'
import Friends from "./components/connect/Friends";

class App extends Component {
  state = {
    open: false
  };

 
  toggleMenu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      };
    });
  };

  logout = () => {
    axios.get("/api/logout").then(() => this.props.history.push("/login"));
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
      
                <Route path='/roadmap/login'  render={() => (<Home login='login'/>)} />
                <Route path='/%2Froadmap%2Fprofile'  component={Home} />


          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard
                toggleMenu={this.toggleMenu}
                open={this.state.open}
                logout={this.logout}
              />
            )}
          />
        
          <Route path="/profile/edit" render={() => <EditProfile  />} />
          <Route
            path="/dashboard/calendar"
            render={() => (
              <Calendar toggleMenu={this.toggleMenu} open={this.state.open} />
            )}
          />
           <Route
            path="/dashboard/connect"
            render={() => (
              <Friends toggleMenu={this.toggleMenu} open={this.state.open} />
            )}
          />
          <Route
            path="/dashboard/jobprep"
            render={() => (
              <JobPrep toggleMenu={this.toggleMenu} open={this.state.open} />
            )}
          />{" "}
          />
          <Route
            path="/dashboard/resources"
            render={() => (
              <Resources toggleMenu={this.toggleMenu} open={this.state.open} />
            )}
          />
          <Route path="/dashboard/Sandbox" component={Sandbox} />

        </Switch>
      </Router>
    );
  }
}


export default App
