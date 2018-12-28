import React, { Component } from "react";
import "./Dashboard.css";
import Header from "./functional/Header";
import Nav from "./functional/Nav";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import axios from "axios";
import styled from "styled-components";
import Menu from "./functional/Menu";
import { Link } from "react-router-dom";
import Repl from "./widgets/Playground";
import TodoList from "./TodoList";
import DropDown from "./functional/DropDown";

const PlayGround = styled(Repl)`
  width: 30%;
  height: 400px;
  margin-left: 0;
  margin-top: 0;
  box-shadow: 0px 2px 2px 0.5px rgb(68, 68, 68);
`;

const Container = styled.div`
  height: 95vh;
  padding-top: 5%;
  display: flex;
  justify-content: space-evenly;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "H",
      last: "I",
      open: false,
      header: false
    };
  }
  componentDidMount = () => {
    axios.get("/auth/session").then(res => {
      console.log(res.data);
      this.setState({ first: res.data.first_name, last: res.data.last_name });
      this.props.getUser(res.data);
    });
  };

  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        this.props.history.push("/home");
      }
    });
  };
  toggleMenu = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };
  showMenu = () => {
    if (this.state.open) {
      return (
        <DropDown>
          <span>Account</span>
          <span onClick={this.logout}>Log Out</span>
        </DropDown>
      );
    }
  };

  render() {
    let first = this.state.first.split("");
    let last = this.state.last.split("");
    console.log(this.props.getUser, this.props.user);
    return (
      <div className="dashboard_main">
        <Header home="home">
          <Nav
            width="40%"
            render={
              <>
                <Link to="/playground">CODE PLAYGROUND</Link>
                <Link to="/jobprep">JOB PREP</Link>
                <Link to="/resources">RESOURCES</Link>
                <Menu onClick={this.toggleMenu}>
                  {`${first[0]} ${last[0]}`}{" "}
                </Menu>
              </>
            }
          />
          {this.showMenu()}
        </Header>

        <Container>
          <TodoList />

          <PlayGround header={this.state.header} />
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
