import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import Button from "./Button";
import background from "../../assets/background.jpg";
import play from "../../assets/play.png";
import chat from "../../assets/chat.png";
import phone from "../../assets/smartphone.png";
import NavLink from "./Nav";


const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 115%;
  background-position-y: -100px;
  position: relative;
  @media(max-width: 1200px){
      background-size: 200%;
      background-position-y: 0;
  }
  h1,
  h4 {
    color: white;
    font-weight: 400;
    font-family: 'Nunito', sans-serif;
  }
  h1 {
    font-size: 52px;
    margin-bottom: 7%;
  }
  h4 {
    font-size: 26px;
    margin-bottom: 15%;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    width: 100%;
    height: 100%;
    background-color: rgba(19, 19, 19, 0.397);
    position: fixed;
    top: 0px;
  }
  .wrapper {
      display: flex;
      justify-content: center;
      font-size: 28px;
      font-weight: 200;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      color: #00A7EE;
  }
  .videoIcon {
      margin-top: 30px;
      margin-right: 5px;
  }
  .chatbox {
    position: absolute;
    right: 5%;
    bottom: 15%;
    border-radius: 5px;
    @media(max-width: 1400px){
        width: 20%;
        bottom: 5%;
    }
    

  }
  .phoneIcon {
    position: absolute;
    right: 4%;
    bottom: 8.5%;
    @media(max-width: 1400px){
        width: 30px;
        bottom: 2%;
    }
  }
`;
const NavBar = styled.nav`
 width: 60%;
 display: flex;
 justify-content: space-evenly;
 align-items: center;


`
const Nav = styled(NavLink)`
    @media(max-width: 1400px){
        font-size: 13px;
    }
    @media (max-width: 1200) {
        font-size: 11px;
        
    }
`



const LandingPage = () => {
  return (
    <Container>
      <Header>
        <NavBar>
        <Nav name="COURSES" />
        <Nav name="STUDENT HOUSING" />
        <Nav name="LOCATIONS" />
        <Nav name="CONTACT" />
        <Nav render={<Button name="FIND YOUR COURSE" />} />
        <Nav render={<Link to="/home" style={{color:'#00AAE8'}}>STUDENT ROADMAP</Link>}/>
     </NavBar>
      </Header>
      <main>
          <div style={{height: '30%'}}>
        <h1>Start a Career You're Proud of</h1>
        <h4>
          On campus and online courses in development, design, and software
          testing.
        </h4>

        <div className='wrapper'>
          <img className="videoIcon" src={play} alt="icon" width="50px" height='50px;' />
        <h6>
          WATCH OUR VIDEO{" "}
        </h6>
        </div>
        </div>
        <img className="chatbox" src={chat} alt="" />
        <img className="phoneIcon" src={phone} alt="" width="50px" />
      </main>
    </Container>
  );
};

export default LandingPage;
