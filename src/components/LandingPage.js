import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./functional/Header";
import Button from "./functional/Button";
import background from "../assets/background.jpg";
import play from "../assets/play.png";
import chat from "../assets/chat.png";
import phone from "../assets/smartphone.png";
import NavLink from "./functional/Nav";
import DropDown from './functional/DropDown'

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 115%;
  background-position-y: -100px;
  position: relative;
  font-family: "Nunito", sans-serif;
  @media (max-width: 1200px) {
    background-size: 200%;
    background-position-y: 0;
  }
  h1 {
    font-size: 52px;
    margin-bottom: 7%;
    @media (max-width: 1500px) {
      font-size: 40px;
    }
  }
  h4 {
    font-size: 26px;
    margin-bottom: 15%;
    @media (max-width: 1500px) {
      font-size: 22px;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(19, 19, 19, 0.397);
    position: fixed;
    top: 0px;
  }
  .content-box {
    color: white;
    margin-top: 15%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    font-size: 20px;
    line-height: 50px;
    font-weight: 200;
    color: #00a7ee;
  }
  .videoIcon {
    margin-right: 5px;
  }
  .chatbox {
    position: absolute;
    right: 5%;
    bottom: 15%;
    border-radius: 5px;
    @media (max-width: 1400px) {
      width: 20%;
      bottom: 5%;
    }
  }
  .phoneIcon {
    position: absolute;
    right: 4%;
    bottom: 8.5%;
    @media (max-width: 1400px) {
      width: 30px;
      bottom: 2%;
    }
  }
  nav {
    @media(max-width: 1100px){
      display: none;
    }
  }
`;
const Nav = styled(NavLink)`
  .navbar {
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  nav {
  @media (max-width: 1500px) {
      font-size: 13px;
    }
    @media (max-width: 1200) {
      font-size: 11px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }
  .navMenu {
    width: 200px;
    height: 100px;
    background-color: white;
    color: black;
  }
`;

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
        <Header onClick={this.toggleMenu}>
          <Nav render={ <>
            <nav>COURSES</nav>
            <nav >STUDENT HOUSING</nav>
            <nav>LOCATIONS</nav>
            <nav>CONTACT</nav>
            <Button name="FIND YOUR COURSE" />
                <Link to="/home" style={{ color: "#00AAE8" }}>
                  STUDENT ROADMAP
          </Link></> }/>
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
