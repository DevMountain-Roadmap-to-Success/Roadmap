import React, { Component } from "react";
import styled from "styled-components";
import brickwall from "../assets/brickwall.JPG";
import brickwall_1 from '../assets/brickwall1.jpg'
import background from '../assets/background.jpg'
import outside from "../assets/outside.jpg";
import LoginModal from "./Login";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";




const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 130%;
  @media (max-width: 1500px) {
    background-size: 105%;
    background-position-y: 80px;
  }
  @media (max-width: 1200px) {
    background-size: 120%;
    background-position-y: 0px;
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
    loginModal: true,
   
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { loginModal: !prevState.loginModal };
    });
  };

  showModal = () => {
    if (this.state.loginModal) {
      return (
        <LoginModal
          onClose={this.toggleModal}
          {...this.props}
        />
      );
    }
  };


  render() {
    console.log(this.props)
    return (
      <Container>
        {this.showModal()}
    
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
