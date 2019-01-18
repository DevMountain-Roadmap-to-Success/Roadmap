import React from 'react'
import styled from 'styled-components'
import Modal from './functional/Modal'
import axios from 'axios'
import Button from './functional/Button'
import LoginForm from './LoginForm'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'

import {withRouter} from 'react-router'

import {inputCheck, accountCheck} from './../Tests/Logic/logic_Jared';




const LoginModal = styled(Modal)`
  background-image: url('http://www.siliconvalley.ninja/wp-content/uploads/2018/04/success-roadmap.png');
  background-size: 117%;
  background-color: #4592B4;
  height: 35vw;
  width: 55vw;
  background-repeat: no-repeat;

  @media (max-width: 1100px){
    position: relative;
    background-image: none;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 300px;

  }
 
  /* @media (max-width: 750px){
    background-size: 180%;

  } */
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    font-weight: bold;
    position: relative;
    height: auto;
    margin-top: 3%;

  }
  input {
    width: 80%;
    height: 40px;
    text-indent: 15px;
    margin-bottom: 10px;
   border: none;
   font-size: 13px;
    


  }
  .login-h1 {
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
    font-family: 'Nunito';
    font-weight: 600;
    line-height: 50px;
    margin-top: 3%;
    @media(min-width: 900px)and (max-width: 1250px){
      font-size: 19px;
    }
    @media(max-width: 1100px){
      font-size: 22px;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;

  }
  .login-wrapper {
    width: 35%;
    box-shadow: 0px 1px 2px 2px rgb(186, 197, 202);
    height: 65%;
    position: absolute;
    right: 5%;
    margin-top: 30px;
    top: 20%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
 
    @media (max-width: 1100px){
        width: 100%;
        height: 100%;
        position: relative;
        right: 0;
        margin: 0;
        top: 0;
        padding-bottom: 30px;
    }
    
  }
  i {
    width: 25px;

  }
  .input-icon {
    height: 45px;
    width: 75%;
    border-bottom: solid thin lightgrey;
  }
`;
const LoginButton = styled(Button)`
  width: 70%;
  height: 40px;
  font-size: 15px;
  background-color: #CD0000;
  box-shadow: 0px 3px 3px 3px rgb(247, 33, 33);
  @media(max-width: 1250px){
    height: 30px;
  }
  @media(max-width: 1100px){
    height: 40px;
  }
  
`




class Login extends React.Component {
  state = {
    disabled: true,
    email: "",
    password: "",
    full_name: "",
    cohort: null,
    error: ''
  };

  componentDidMount = () => {
    if(localStorage.getItem('email')){
      this.setState({email: localStorage.getItem('email') })
    } else {
      return null
    }
  }
  getValidationState() {
    const length = this.state.email.length && this.state.password.length
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
  }


  signup = () => {
    const { email, password } = this.state;
    axios
      .post("/auth/signup", {
        email: email,
        password: password
      })
      .then(res => {
       if (res.status === 200) {
          localStorage.setItem('email', email)
          this.props.getUser(res.data)

          this.props.history.push(`/%2Froadmap%2Fprofile`);

        }
    })
  }

    login = () => {
      const { email, password } = this.state;
      // console.log(email, password)
      axios.post("/auth/login", { email, password })
        .then(res => {
       if (res.status === 200) {
          localStorage.setItem('email', email)
          this.props.getUser(res.data)
           this.props.history.push("/dashboard");
        } else if(res.status === 403){
          alert({error: 'account not found'})
          console.log(res);
          accountCheck(res.status)
        }

      });
  };


    handleInput = e => {
      
      this.setState({ [e.target.name ]: e.target.value });
      inputCheck(e.target.name);
    };
  

  
    render(){
    return (
        <LoginModal>
        
        <Link to='/'> <i
            className='	
            glyphicon glyphicon-remove close'
              alt=""
              width="15px"
              height="15px"
              

            /></Link>
          <div className='login-wrapper'>
          <header>
            
            <h1 
              className='login-h1'
              disabled={this.state.disabled}
              onClick={() => this.setState({ disabled: false })}
              style={{ color: this.state.disabled ? "grey" : "#00A8EF" }}
            >
              SIGN UP
            </h1>

            <h1
             className='login-h1'
              style={{ color: this.state.disabled ? "#00A8EF" : "grey" }}
              onClick={() => this.setState({ disabled: true })}
            >
              LOGIN
            </h1>
          
          </header>
          <LoginForm 
          email={this.state.email}
          password={this.state.password}
          full_name={this.state.full_name}
          cohort={this.state.cohort}
          onChange={this.handleInput}
          disabled={this.state.disabled}
          validate={this.getValidationState}/>
     <LoginButton
         name={this.state.disabled ? "LOGIN" : "SIGN UP"}
         onClick={this.state.disabled ?  () => this.login() : () => this.signup()  }
       />

   <p style={{color: 'red'}}>{this.props.error}</p>
    


     </div>
          </LoginModal>
    )
}
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, {getUser})(Login));

