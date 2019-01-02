import React from "react";
import styled from "styled-components";
import Button from "./functional/Button";
import xIcon from "../assets/close.png";
import Modal from "./functional/Modal";
import Form from "./functional/Form";
import Input from "./functional/Input";
import axios from "axios";
import success from '../assets/success-circle.png'
import {Link} from 'react-router-dom'

const LoginModal = styled(Modal)`
  /* background-color: rgba(255, 255, 255, 0.856); */
  background-image: url('http://www.siliconvalley.ninja/wp-content/uploads/2018/04/success-roadmap.png');
  background-size: 100%;
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
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;

  }
  .login-wrapper {
    width: 320px;
    box-shadow: 0px 1px 2px 2px rgb(186, 197, 202);
    height: 380px;
    position: absolute;
    right: 5%;
    top: 20%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
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

`
const LoginForm = styled(Form)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const InputWrapper = styled.div `
//     width: 100%;
//     height: 45px;

// `




 class Login extends React.Component {
    state = {
      disabled: true,
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    };

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
      // this.props.onClose();
    };

    login = () => {
      const { email, password } = this.state;
      console.log(email, password)
      axios.post("/auth/login", { email, password }).then(res => {
        if (res.status === 200) {
          this.props.history.push("/dashboard");
        }
      });
      this.props.onClose();
    };

    handleInput = e => {
      
      this.setState({ [e.target.name ]: e.target.value });
    };
  

    render() {
      console.log(this.state);
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
            render={
              !this.state.disabled ? (
                <div style={{marginBottom: '20px'}}>
                <div className='input-icon'  style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}} >
                <i className='glyphicon glyphicon-user' style={{borderRight: 'thin solid grey', height:'15px', width:'20px', color: 'grey', paddingRight: '15px'}}></i>
                  <Input

                    placeholder="First Name"
                    name="first_name"
                    onChange={this.handleInput}
                  />
                  <Input
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.handleInput}
                  /></div>
                   <div className='input-icon' style={{marginBottom: '5px'}} >
                   <i className='glyphicon glyphicon-envelope' width='20px' height='15px' style={{borderRight: 'thin solid #279DFF', color: '#279DFF'}}></i>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  /></div>
                   <div className='input-icon'  >  <i className='glyphicon glyphicon-lock' style={{borderRight: 'thin solid grey', color: 'grey'}}></i>
                  <Input
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
          />
     <LoginButton
                name={this.state.disabled ? "LOGIN" : "SIGN UP"}
                onClick={this.state.disabled ?  () => this.login() : () => this.signup()  }
              />
          </div>
        </LoginModal>
      );
    }
  };

export default Login;
