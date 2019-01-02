import React from "react";
import { Link } from "react-router-dom";
import Header from "./functional/Header";
import Button from "./functional/Button";
import play from "../assets/play.png";
import chat from "../assets/chat.png";
import phone from "../assets/smartphone.png";
import DropDown from './functional/DropDown'
import {Container, Nav} from './Styles'


class LandingPage extends React.Component {
  state = {
    open: false
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };


  showMenu = () => {
    if (this.state.open) {
      return (
        <DropDown />
      )}}

  render() {
    return (
      <Container>
        <Header >
          <Nav width='60%'
          render={ <>
            <nav>COURSES</nav>
            <nav >STUDENT HOUSING</nav>
            <nav>LOCATIONS</nav>
            <nav>CONTACT</nav>
            <Button name="FIND YOUR COURSE" />
                <Link to='/login' style={{ color: "#00AAE8", cursor: 'pointer' }}>
                  STUDENT ROADMAP</Link> 
          </> } />
        </Header>
        {this.showMenu()}

        <main>
          <div className="content-box">
            <h1>Start a Career You're Proud of</h1>
            <h4 style={{ fontWeight: "lighter" }}>
              On campus and online courses in development, design, and software
              testing.
            </h4>

            <div className="wrapper">
              <img
                className="videoIcon"
                src={play}
                alt="icon"
                width="50px"
                height="50px;"
              />
              <h6>WATCH OUR VIDEO </h6>
            </div>
          </div>
          <img className="chatbox" src={chat} alt="" />
          <img className="phoneIcon" src={phone} alt="" width="50px" />
        </main>
      </Container>
    );
  }
}

export default LandingPage;
