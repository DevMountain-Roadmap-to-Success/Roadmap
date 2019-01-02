import React from "react";
import styled from "styled-components";
import menu from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: #252525;
  height: 90px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: ${props => props.justifyContent || 'space-between'};

  img {
    width: 240px;
    height: 45px;
    margin-left: 150px;
    @media (max-width: 1100px) {
      margin-left: 80px;
    }
  }
  .menu-icon {
    display: none;
    @media (max-width: 1100px) {
      display: block;
      height: 40px;
      width: auto;
      margin-right: 5%;
      cursor: pointer;
    }
    @media(max-width: 600px) {
      height: 30px;
    }
  }
`;

const Header = props => {
  console.log(props)
  return (
    <StyledHeader {...props}>
      <Link to={ !props.home ? "/" : '/home'}>
        <img src={logo} alt="logo" className="logo" />
      </Link> 
      {props.children}     
      <img src={menu} alt="icon" className="menu-icon" onClick={props.onClick}/>
    </StyledHeader>
  );
};

export default Header;
