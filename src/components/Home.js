import React, {Component} from 'react'
import styled from 'styled-components'
import brickwall from '../assets/brickwall.JPG'
import Header from './Header'
import {Link} from 'react-router-dom'
import Button from './functional/Button'
import Nav from './functional/Nav'
import Login from './functional/Login'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'

const Container = styled.div `
    background-image: url(${brickwall});
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    background-size: 100%;
    background-position-y: -100px;
    @media(max-width: 1400px){
      background-size: 150%;
      background-position-y: 0px;
      background-position-x: -200px;
      
    }
    a{
      font-size: 18px;
      margin-right: 8%;
    }
   .navbar {
     width: 35%;

   }
  
    main {
      width: 100%;
      height: 100%;
      background-color: rgba(20, 20, 20, 0.651);
      position: fixed;
      top: 0px;
    }


`



class Home extends Component {
    state = {
      loginModal: false,
      email: '',
      password: ''
    }

    toggleModal = () => {
      this.setState(prevState => { return { loginModal: !prevState.loginModal } })
    }

    showModal = () => {
      if(this.state.loginModal) {
        return (
        <Login 
        onClose={this.toggleModal} 
        onClick={this.login} 
        onChange={this.handleInput }
        email={this.state.email}
        password={this.state.password}
        />
        )
      }
    }

    login = () => {
     const {email, password} = this.state
      axios.post('/auth/login', { email, password })
      .then((res) => { this.props.getUser(res.data)})
      .catch((err => console.log(err, 'login failure')))
    }
    handleInput = (event) => {
      console.log(event.target.value)
      this.setState({ [ event.target.type ] : event.target.value})
    }

  render(){
    return (
        <Container>
           <Header>
             <div className='navbar'>
              <Nav render={
               <Link to='/resources'>RESOURCES</Link> }/>
              <Nav render={<Link to='/jobprep'>JOB PREP</Link> }/>
              <Nav render={ <Button onClick={this.toggleModal} name='LOGIN / SIGNUP'/> }/>
              </div>
         </Header>
            {this.showModal()} 
         <main>
               <h1>ROADMAP TOWARDS SUCCESS</h1>
            </main>
        </Container>
    )
  }
}
const mapStateToProps = state => {
  const {user} = state
    return { user }
}
const bindActionCreators = { getUser }

export default connect(mapStateToProps, bindActionCreators)(Home)