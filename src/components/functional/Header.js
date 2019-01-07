import React from "react";
import styled from "styled-components";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import Nav from './Nav'

const StyledHeader = styled.header`
  background-color: ${props => props.background || '#252525'};
  height: 90px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: ${props => props.justifyContent || 'space-between'};

  .logo {
    width: 240px;
    height: 45px;
    margin-left: 150px;
    @media (max-width: 1100px) {
      margin-left: 80px;
    }
  }

  .menu-icon {
      width: 60px;
      height: auto;
      margin-left: 3%;
      cursor: pointer;
    }
    @media(max-width: 600px) {
      height: 30px;
    }
    h1 {
      text-indent: 5%;
      font-size: 40px;
      font-family: 'Happy Monkey';
      width: auto;
    }
  
`;

const Header = props => {
  console.log(props)
  return (
    <StyledHeader {...props}>
       {props.devLogo ?
        <img src={logo} alt="" className="logo" style={{border: 'none'}}/>
        : <img src={menu} onClick={props.toggleMenu} className='menu-icon' alt=''/>}
     
       {props.children} 
    </StyledHeader>
  );
};

export default Header;
