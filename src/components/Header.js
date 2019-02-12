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
import ProfilePic from './profile/ProfilePic'
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
    /* height: 45px; */
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
   
    h1 {
      text-indent: 5%;
      font-size: 40px;
      font-family: 'Happy Monkey';
      width: auto;
      @media (max-width: 1200px){
        font-size: 32px;
      }
      @media(max-width: 550px){
        display: none;
      }
    }
  
`;
const Image = styled.img`
  border-radius: 50%;
`


class Header extends React.Component {
  state = {
    dropdown: false,
    full_name: '',
    alert: false,
    edit: false,
    successAlert: false,
    warningAlert: false,

  }
componentDidMount(){
  axios.get('/auth/session')
  .then((res)=> {
    this.setState({full_name: res.data.full_name, image: res.data.image})
  })
}

toggleOpen = () => {
  this.setState(prevState => {
    return { dropdown: !prevState.dropdown}
  })
}

toggleAlert = () => {
   this.setState(prevState => { return { alert: !prevState.alert }
  })
  return this.toggleOpen()
}
  deleteAccount = () => {
    const {full_name} = this.props
    axios.delete('/api/delete', full_name)
    .then((res) => {
      if(res.status === 200){
        return this.props.history.push('/')
      }
    } )
  }
  showAlert = () => {
    if(this.state.alert){
      return (
        <SweetAlert 
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={this.deleteAccount}
        onCancel={this.toggleAlert}
    >
        You will not be able to recover your account
    </SweetAlert>
      )
    }
  }
  
  logout = () => {
    axios.get('/api/logout')
    .then(() => {
      this.toggleOpen()
    })
    return this.props.history.push('/roadmap/login') 
  }

  render(){
  const {toggleMenu} = this.props
  const { full_name, image } = this.state

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
        user={this.props.user}
       editProfile={this.toggleEdit}
       delete={this.toggleAlert} 
       logout={this.logout}
       dropdown={this.state.dropdown}>
            <Image

              src={
                image ? image : defaultPic
              }
              style={{ width: "60px", height: "60px", marginLeft: 0 }}
            />

            <p  style={{textTransform: 'uppercase'}} >{`${full_name}`}</p>
            <i onClick={this.toggleOpen}
              className="material-icons"
              style={{ marginTop: "18px" }}
            >
              keyboard_arrow_down
            </i>
          
          </ProfilePic >
          </> }

              {this.showAlert()}
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
    user: state.user,
    
  }
}

export default withRouter(connect(mapStateToProps, {toggleMenu, getUser})(Header))
