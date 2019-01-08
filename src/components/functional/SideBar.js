import React from "react";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import Nav from "./Nav";
import { connect } from "react-redux";
import axios from "axios";

const MenuWell = styled(Menu)`
  width: 200px;
  height: 100vh;
  display: inline-block;
  background-color: #303741;
  color: white;
  display: flex;
  flex-direction: column;
  text-indent: 5px;
  line-height: 30px;
  padding-top: 10px;
  margin: 0;
  -webkit-transition-delay: 3s;
  border-color: #303741;
  /* position: absolute; */
  /* top: 0; */

  span {
    cursor: pointer;
  }
  a:hover,
  span:hover {
    background-color: lightgrey;
    color: black;
  }
  a {
    text-decoration: none;
    color: white;
  }
  button {
    display: none;
  }
`;

class SideBar extends React.Component {
  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };
  render() {
    console.log(this.props);
    const { open } = this.props;
    return (
      <MenuWell
        customBurgerIcon={false}
        width="250px"
        isOpen={open}
        noOverlay
        onStateChange={this.props.handleStateChange}
        disableOverlayClick={true}
      >
        <Nav>{this.props.children}</Nav>
      </MenuWell>
    );
  }
}
const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default connect(mapStateToProps)(SideBar);
