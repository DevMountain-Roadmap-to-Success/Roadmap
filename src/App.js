import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login'
import Resources from "./components/Resources";
import JobPrep from "./components/JobPrep";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import LandingPage from "./components/LandingPage";
import PlayGround from "./components/widgets/Playground";
import Home from './components/Home'

class App extends Component {
 getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
  }
  
  render() {
    return (


        <Router getUserConfirmation={this.getConfirmation}>
          <Switch>
         
            <Route exact path="/"component={LandingPage} />
            <Route exact path='/login' component={Home}/>  
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/jobprep" component={JobPrep} />
            <Route path="/resources" component={Resources} />
            <Route path='/playground' component={PlayGround}/>
          </Switch>
        </Router>

    );
  }
}

export default App;
