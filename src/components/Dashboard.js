import React, { Component } from "react";
import "./Dashboard.css";
import Header from './functional/Header'
import Nav from './functional/Nav'
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'
import axios from "axios";
import styled from 'styled-components'
import Circle from './functional/Circle'
import {Link} from 'react-router-dom'
import PlayGround from "./widgets/Playground";
import TodoList from './TodoList'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        first: 'H',
        last: 'I'
    };
  }
  componentDidMount = () => {
    axios.get('/auth/session')
    .then((res) =>  { 
      console.log(res.data)
      this.setState({first: res.data.first_name, last: res.data.last_name})
      this.props.getUser(res.data) })
  }
  render() {
    let first = this.state.first.split('')
    let last = this.state.last.split('')
    console.log(this.props.getUser, this.props.user)
    return (
      <div>
        <Header home='home'>
          <Nav width='30%'render={
            <>
          <Link to='/playground'>Code PlayGround</Link>
          <nav>Job Prep</nav>
          <nav>Resources</nav>
       <Circle>{`${first[0]} ${last[0]}`}</Circle>
          </>}/>
       </Header> 
        <div className="dashboard_main">
            <PlayGround/>
            <TodoList />
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps,{ getUser })(Dashboard);
