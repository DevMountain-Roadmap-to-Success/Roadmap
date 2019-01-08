import React from "react";
import styled from "styled-components";
import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import {toggleMenu} from '../ducks/reducer'
import {connect} from 'react-redux'
import SideBar from './functional/SideBar'
import Nav from './functional/Nav'
import axios from 'axios'
import {withRouter} from 'react-router'

const StyledHeader = styled.header`
  background-color: ${props => props.background || '#2F3642'};
  height: 90px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: ${props => props.justifyContent || 'unset'};

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
      @media (max-width: 1200px){
        font-size: 32px;
      }
    }
  
`;

class Header extends React.Component {

  logout = () => {
    axios.get('/api/logout')
    .then(() => this.props.history.push('/login'))
  }

  render(){
  const {toggleMenu} = this.props
  console.log(this.props)
  return (
    <>
    <StyledHeader {...this.props}>
       {this.props.devLogo ?
         <img src={logo} alt="" className="logo" style={{border: 'none'}}/>
        : <img src={menu} onClick={() => toggleMenu(this.props.open)} className='menu-icon' alt=''/>}
      
       {this.props.children} 
    </StyledHeader>
    <SideBar isOpen={this.props.open} >
    <Nav logout={this.logout}/>
    </SideBar>

    </>
  );
};
}
const mapStateToProps = state => {
  return {
    open: state.open
  }
}

export default withRouter(connect(mapStateToProps, {toggleMenu})(Header))
