import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Resources from "./components/Resources";
import JobPrep from "./components/JobPrep";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import LandingPage from "./components/LandingPage";
import PlayGround from "./components/widgets/Playground";
import Home from './components/Home'
import SideBar from './components/functional/SideBar'
import Nav from './components/functional/Nav'
import axios from 'axios'

class App extends Component {
 state = {
   open: false
 }

 toggleMenu = () => {
   this.setState(prevState => {
     return {
       open: !prevState.open
     }
   })
 }
 logout = () => {
   axios.get('/api/logout')
   .then(() => this.props.history.push('/login'))
 }

  render() {
    return (

        <Router >
          <Switch>         
            <Route exact path="/"component={LandingPage} />
            <Route exact path='/login' component={Home}/>  
            <Route exact path="/dashboard" render={() => (<Dashboard toggleMenu={this.toggleMenu} open={this.state.open} logout={this.logout}/>
             )} />
            <Route path="/calendar" render={() => (<Calendar toggleMenu={this.toggleMenu} open={this.state.open}/> )} />
            <Route path="/jobprep" render={() => (<JobPrep toggleMenu={this.toggleMenu} open={this.state.open}/> )} /> />
            <Route path="/resources" render={() => (<Resources toggleMenu={this.toggleMenu} open={this.state.open}/> )}  />
            <Route path='/playground' component={PlayGround}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
