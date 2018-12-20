import React, { Component } from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Resources from "./components/Resources";
import JobPrep from "./components/JobPrep";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import LandingPage from "./components/LandingPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/"component={LandingPage} />
            <Route path='/home' component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/jobprep" component={JobPrep} />
            <Route path="/resources" component={Resources} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
