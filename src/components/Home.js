import React, { Component } from "react";
import styled from "styled-components";
import brickwall from "../assets/brickwall.JPG";
import brickwall_1 from "../assets/brickwall1.jpg";
import outside from "../assets/outside.jpg";
import Header from "./functional/Header";
import { Link } from "react-router-dom";
import Button from "./functional/Button";
import Nav from "./functional/Nav";
import Login from "./functional/Login";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import {Redirect} from 'react-router'




const Container = styled.div`
  background-image: url(${outside});
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 100%;
  @media (max-width: 1500px) {
    background-size: 105%;
    background-position-y: 80px;
  }
  @media (max-width: 1200px) {
    background-size: 120%;
    background-position-y: 90px;
  }
  @media (max-width: 1100px) {
    background-image: url(${brickwall});
    background-position-x: -100px;
    background-position-y: -60px;
  }
  @media (max-width: 900px) {
    background-position-y: 70px;
    background-size: 130%;
  }
  @media (max-width: 700px) {
    background-image: url(${brickwall_1});
    background-size: 100%;
    background-position-x: 0;
  }
  a {
    font-size: 18px;
    margin-right: 8%;
  }
  .navbar {
    width: 35%;
  }

  main {
    width: 100%;
    height: 100%;
    background-color: rgba(49, 49, 49, 0.493);
    position: fixed;
    top: 0px;
  }
`;

class Home extends Component {
  state = {
    loginModal: false,
    email: "",
    password: ""
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { loginModal: !prevState.loginModal };
    });
  };

  showModal = () => {
    if (this.state.loginModal) {
      return (
        <Login
          onClose={this.toggleModal}
          onClick={this.login}
          onChange={this.handleInput}
          email={this.state.email}
          password={this.state.password}
        />
      );
    }
  };

  login = () => {
    const { email, password } = this.state;
    console.log(email, password);
    axios
      .post("/auth/login", { email, password })
      .then(res => {
         if(res.status === 200){
            this.props.history.push('/dashboard')
         }
        })
        this.toggleModal();
  };

  handleInput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.type]: event.target.value });
  };

  render() {
    console.log(this.props.user)
    return (
      <Container>
        <Header>
          <Nav
            width="40%"
            render={
              <>
                {" "}
                <Link to="/resources">RESOURCES</Link>
                <Link to="/jobprep">JOB PREP</Link>
                {this.props.user ? (
                  <Button onClick={this.toggleModal} name="LOGIN / SIGNUP" />
                ) : (
                  <Button onClick={this.toggleModal} name={`${this.props.user.first_name}`} />
                )}
              </>
            }
          />
        </Header>
        {this.showModal()}
        <main>
          <h1>ROADMAP TOWARDS SUCCESS</h1>
        </main>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
};
const actionCreators = { getUser };

export default connect(
  mapStateToProps,
  actionCreators
)(Home);
