import React from "react";
import styled from "styled-components";
import Button from "./functional/Button";
import xIcon from "../assets/close.png";
import Modal from "./functional/Modal";
import Form from "./functional/Form";
import Input from "./functional/Input";
import axios from "axios";

const LoginModal = styled(Modal)`
  header {
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: space-evenly;
    font-weight: bold;
  }
  input {
    width: 80%;
    height: 20%;
    text-indent: 15px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    font-family: 'Nunito';
    font-weight: 600;
    line-height: 50px;
  }
`;
const LoginForm = styled(Form)`
  width: 100%;
  height: 60%;
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
      this.props.onClose();
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
          <header>
            <h1
              disabled={this.state.disabled}
              onClick={() => this.setState({ disabled: false })}
              style={{ color: this.state.disabled ? "grey" : "#00A8EF" }}
            >
              SIGN UP
            </h1>

            <h1
              style={{ color: this.state.disabled ? "#00A8EF" : "grey" }}
              onClick={() => this.setState({ disabled: true })}
            >
              LOGIN
            </h1>
            <img
              src={xIcon}
              alt=""
              width="20px"
              height="20px"
              onClick={this.props.onClose}
            />
          </header>
          <LoginForm
            render={
              !this.state.disabled ? (
                <>
                  <Input
                    placeholder="First Name"
                    name="first_name"
                    onChange={this.handleInput}
                  />
                  <Input
                    placeholder="Last Name"
                    name="last_name"
                    onChange={this.handleInput}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleInput}
                  />
                </>
              ) : (
                <>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    name='password'
                    value={this.state.value}
                    onChange={this.handleInput}
                  />{" "}
                </>
              )
            }
          />

          <Button
            name={this.state.disabled ? "LOGIN" : "SIGN UP"}
            onClick={this.state.disabled ?  () => this.login() : () => this.signup()  }
          />
        </LoginModal>
      );
    }
  };

export default Login;
