import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Resources from "./components/Resources";
import JobPrep from "./components/JobPrep";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import LandingPage from "./components/LandingPage";

class App extends Component {
  render() {
    return (

        <Router>
          <Switch>
            <Route exact path="/"component={LandingPage} />
            <Route exact path='/home' component={Home} />    
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/jobprep" component={JobPrep} />
            <Route path="/resources" component={Resources} />
          </Switch>
        </Router>

    );
  }
}

export default App;
