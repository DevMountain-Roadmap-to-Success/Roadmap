import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";
import xIcon from '../../assets/close.png'
import Modal from './Modal'

const LoginModal = styled(Modal)`
  header {
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: space-evenly;
  }
  input {
    width: 80%;
    height: 40px;
    text-indent: 15px;
  }

`;


const Login = (props) => {
    console.log(props)
    return (
        <LoginModal>
          <header  >
            <h1>Sign Up</h1>
            <h1>Login</h1> 
            <img
              src={xIcon}
              alt=""
              width="20px"
              height="20px"
              onClick={props.onClose}
            />
          </header>
          <input placeholder="Email" type="email" value={props.email} onChange={props.onChange}/>
          <input placeholder="Password" type="password" value={props.value}  onChange={props.onChange}/>
          <Button name="Login" />
        </LoginModal>
    );

}

export default Login;
