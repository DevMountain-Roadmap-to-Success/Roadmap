import React from "react";
import styled from "styled-components";
import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import {toggleMenu, getUser} from '../ducks/reducer'
import {connect} from 'react-redux'
import SideBar from './functional/SideBar'
import Nav from './functional/Nav'
import axios from 'axios'
import {withRouter} from 'react-router'
import ProfilePic from './functional/ProfilePic'
import defaultPic from '../assets/profile.png'
import SweetAlert from 'react-bootstrap-sweetalert'

const StyledHeader = styled.header`
  background-color: ${props => props.background || '#2F3642'};
  height: 80px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: ${props => props.justifyContent || 'unset'};
  border-bottom: ${props => props.border || 'rgba(255, 255, 255, 0.808) solid thin'};
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
const Image = styled.img`
  border-radius: 50%;
`


class Header extends React.Component {
  state = {
    dropdown: false,
    first: '',
    last: '',
    alert: false,
  }
componentDidMount = (props) => {
  let {first_name, last_name} = this.props.user
  this.setState({first: first_name, last: last_name})
}

  
  logout = () => {
    axios.get('/api/logout')
    .then(() => this.props.history.push('/login'))
  }
  toggleAlert = () => {
    this.setState(prevState => {
      return { alert: !prevState.alert}
    })
  }

  deleteWarning = () => {
    return this.state.alert ? (
    <SweetAlert 
    warning
    showCancel
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    cancelBtnBsStyle="default"
    title="Are you sure?"
    onConfirm={this.delete}
    onCancel={this.toggleAlert}
>
    You will not be able to recover your account
</SweetAlert>
    ) : ( null )
  }
  delete = () => {
    axios.delete('/api/account')
    .then(() => this.props.history.push('/'))
  }
toggleOpen = () => {
  this.setState(prevState => { return { dropdown: !prevState.dropdown }})
}
  render(){
  const {toggleMenu} = this.props
  const { first_name, last_name, image } = this.props.user

  return (
    <>
    <StyledHeader {...this.props}
    border='none' >
       {this.props.devLogo ?
       <>
         <img src={logo} alt="" className="logo" style={{border: 'none'}}/>
         <Nav nav={this.props.nav} />
         </>
        :
        <>
        <img src={menu} onClick={() => toggleMenu(this.props.open)} className='menu-icon' alt=''/>      
        {this.props.children} 
       <ProfilePic {...this.props}
       delete={this.toggleAlert} 
       logout={this.logout}
       dropdown={this.state.dropdown}>
            <Image

              src={
                image ? image : defaultPic
              }
              style={{ width: "60px", height: "60px", marginLeft: 0 }}
            />

            <p  style={{textTransform: 'uppercase'}} >{`${first_name} ${last_name}`}</p>
            <i onClick={this.toggleOpen}
              className="material-icons"
              style={{ marginTop: "18px" }}
            >
              keyboard_arrow_down
            </i>
          
          </ProfilePic >
          </> }
          {this.deleteWarning()}
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
    open: state.open,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {toggleMenu, getUser})(Header))
