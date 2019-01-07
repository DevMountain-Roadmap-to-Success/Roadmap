import React from "react";
import styled from "styled-components";
import Button from "./functional/Button";
import Modal from "./functional/Modal";
import Form from "./functional/Form";
import Input from "./functional/Input";
import axios from "axios";
import {Link, Route, Redirect} from 'react-router-dom'
import Fade from '@material-ui/core/Fade';



const LoginModal = styled(Modal)`
  background-image: url('http://www.siliconvalley.ninja/wp-content/uploads/2018/04/success-roadmap.png');
  background-size: 100%;
  height: 65%;
  width: 55vw;
  background-repeat: no-repeat;
  /* @media (max-width: 1500px){
    background-size: 126%;
  } */
  @media (max-width: 1150px){
    background-color: transparent;
    background-image: none;


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
    @media(max-width: 1150px){
      font-size: 19px;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;

  }
  .login-wrapper {
    width: 300px;
    box-shadow: 0px 1px 2px 2px rgb(186, 197, 202);
    height: 350px;
    position: absolute;
    right: 5%;
    margin-top: 30px;
    top: 20%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(max-width: 1300px){
      height: 300px;
       width: 250px;
    }
    @media (max-width: 1150px){
      height: 350px;
      width: 300px;
      right: 25%;
      top: 5%;
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
  @media(max-width: 1150px){
    height: 32px;
  }
`
const LoginForm = styled(Form)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;



 class Login extends React.Component {
    state = {
      disabled: true,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      error: ''
    };
  

    getValidationState() {
      const length = this.state.email.length && this.state.password.length
      if (length > 5) return 'success';
      else if (length > 0) return 'error';
      return null;
    }
  
    signup = () => {
      const { email, password, first_name, last_name } = this.state;
      console.log(first_name, last_name, email, password);
      axios
        .post("/auth/signup", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        })
        .then(res => {
          if (res.status === 200) {
            this.props.history.push("/dashboard");
          } 
        });
    };

    login = () => {
      const { email, password } = this.state;
      console.log(email, password)
      axios.post("/auth/login", { email, password }).then(res => {
        if (res.status === 200) {
          this.props.history.push("/dashboard");
        } else if(!res){
          alert({error: 'account not found'})
        }
      });
    };

    handleInput = e => {
      
      this.setState({ [e.target.name ]: e.target.value });
    };
  

    render() {
      console.log(this.state.error);
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
          <LoginForm validationState={this.getValidationState()}>
              {!this.state.disabled ? (
                <div style={{marginBottom: '20px', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems:  'center'}}>
                <div className='input-icon'  style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}} >
                <i className='glyphicon glyphicon-user' style={{borderRight: 'thin solid grey', height:'15px', width:'20px', color: 'grey', paddingRight: '23px'}}></i>
                  <Input
                    value={this.state.first_name}
                    placeholder="First Name"
                    name="first_name"
                    onChange={this.handleInput}
                  />
                  <Input
                    value={this.state.last_name}
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.handleInput}
                  /></div>
                   <div className='input-icon' style={{marginBottom: '5px'}} >
                   <i className='glyphicon glyphicon-envelope' width='20px' height='15px' style={{borderRight: 'thin solid #279DFF', color: '#279DFF'}}></i>
                  <Input
                    value={this.state.email}
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  /></div>
                   <div className='input-icon'  >  <i className='glyphicon glyphicon-lock' style={{borderRight: 'thin solid grey', color: 'grey'}}></i>
                  <Input
                   value={this.state.password}
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleInput}
                  /></div>
                </div>
              ) : (
                <>
                <div className='input-icon'  style={{marginBottom: '20px'}}>
                <i className='glyphicon glyphicon-envelope' width='20px' height='15px' style={{borderRight: 'thin solid #279DFF', color: '#279DFF'}}></i>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  /></div>
                  <div className='input-icon'>
                  <i className='glyphicon glyphicon-lock' style={{borderRight: 'thin solid grey', color: 'grey'}}></i>
                  <Input
                    placeholder="Password"
                    type="password"
                    name='password'
                    value={this.state.value}
                    onChange={this.handleInput}
                  /></div>
         
                </>

              )
            }
        </LoginForm>
     <LoginButton
                name={this.state.disabled ? "LOGIN" : "SIGN UP"}
                onClick={this.state.disabled ?  () => this.login() : () => this.signup()  }
              />

          </div>
          <p style={{color: 'red'}}>{this.state.error}</p>
  
     
       </LoginModal>

      );
          }
  };

export default Login;
