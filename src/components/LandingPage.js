import React from "react";
import Header from "./Header";
import play from "../assets/play.png";
import chat from "../assets/chat.png";
import phone from "../assets/smartphone.png";
import DropDown from './functional/SideBar'
import {Container} from './Styles'
import logo from '../assets/logo.png'

class LandingPage extends React.Component {
  state = {
    open: false
  };
  render() {
    return (
      <Container>
        <Header devLogo={logo} 
        background='#252525'
        justifyContent='space-between'
        nav='landing page'/>
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
