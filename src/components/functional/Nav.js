import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link, withRouter } from "react-router-dom";
// import {withRouter} from 'react-router'
import axios from "axios";
import "@material-ui/icons";

const NavLinks = styled.div`
  color: ${props => props.color || "white"};
  font-size: 15.5px;
  font-weight: 400;
  letter-spacing: 0.5px;
  width: ${props => props.width || "auto"};
  height: 100%;
  display: flex;
  justify-content: ${props => props.justifyContent || "space-between"};
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    font-size: 15.5px;
    font-family: "Nunito";
    margin-right: 3%;
   
  }
  @media (max-width: 1500px) {
    a {
      font-size: 12px;
    }
  }
  @media (max-width: 1100px) {
    width: 150px;
    a {
      display: none;
    }
  }
  span {
    color: white;
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  line-height: 45px;

  a, span {
    display: flex;
    align-items: center;
    font-size: 24px;

  }
  i {
      margin-right: 15px;
      font-size: 22px;
  }
`;

const Nav = (props) => {
 
    console.log(props);
    return (
      <>
        {props.nav ? (
          <NavLinks {...props} width="60%">
            <nav>COURSES</nav>
            <nav>STUDENT HOUSING</nav>
            <nav>LOCATIONS</nav>
            <nav>CONTACT</nav>
            <Button name="FIND YOUR COURSE" />
            <Link to="/login" style={{ color: "#00AAE8", cursor: "pointer" }}>
              STUDENT ROADMAP
            </Link>
          </NavLinks>
        ) : (
          <MenuItems>
            {props.children}
            <Link to="/calendar">
              <i className="material-icons">calendar_today</i>Calendar
            </Link>
            <Link to="/resources">
              <i className="material-icons">local_library</i>Resources
            </Link>
            <Link to="/jobprep">
              <i className="material-icons">next_week</i>Job Prep
            </Link>
            <Link to='/'>
            <i className="material-icons">settings</i>
              Settings
            </Link>
            <span onClick={props.logout}>
              {" "}
              <i className="material-icons">exit_to_app</i>Logout
            </span>
          </MenuItems>
        )}
      </>
    );
  }

export default Nav;
