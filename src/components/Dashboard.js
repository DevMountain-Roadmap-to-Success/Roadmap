import React, { Component } from "react";
import "./Dashboard.css";
import Header from "./functional/Header";
import Nav from "./functional/Nav";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import axios from "axios";
import styled from "styled-components";
import MenuIcon from "./functional/MenuIcon";
import { Link } from "react-router-dom";
import Repl from "./widgets/Playground";
import TodoList from "./TodoList";
import SideBar from "./functional/SideBar";
import EditTask from "./functional/EditTask";
import Weather from "./widgets/Weather";
import Chart from "./widgets/Chart";
import DropDown from "./functional/DropDown";
import profilePic from '../assets/profile.png'

const Image = styled.img`
  border-radius: 50%;
`;

const PlayGround = styled(Repl)`
  width: 400px;
  height: 400px;
  margin-left: 0;
  margin-top: 0;
  box-shadow: 0px 2px 2px 0.5px rgb(68, 68, 68);
`;

class UserDashboard extends Component {

    state = {
      first: "H",
      last: "I",
      open: false,
      header: false,
      dropdown: false,
      description: "",
      image: profilePic
  }

  componentDidMount = () => {
    axios.get("/auth/session").then(res => {
      this.setState({ first: res.data.first_name, last: res.data.last_name });
      this.props.getUser(res.data);
    });
  };
  deleteAccount = () => {
    axios.delete('/api/account')
    .then(() => {
      this.props.history.push('/login')
    })
  }
  logout = () => {
    axios.get("/api/logout").then(res => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };
  toggleMenu = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };
  handleStateChange = (state) => {
    this.setState({ open: state.isOpen });
  }


  toggleEdit = (id, name) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    this.setState(prevState => {
      return {
        editTask: !prevState.editTask
      };
    });
  };
  renderEditTask = () => {
    if (this.state.editTask) {
      return (
        <EditTask
          name="description"
          description={this.state.description}
          onChange={this.handleChange}
          tasks={this.state.tasks}
        />
      );
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // let first = this.state.first.split("");
    // let last = this.state.last.split("");
    console.log(this.props.user);
    return (
      <div className="dashboard_main">
        <Header
          background="#2F3642"
          justifyContent="unset"
          toggleMenu={this.toggleMenu}
        >
        <h1>Roadmap Dashboard</h1>
          <MenuIcon>
            <Image
              src={this.props.user.image ? this.props.user.image : this.state.image}
              style={{ width: "60px", height: "60px", marginLeft: 0 }}
            />

          <p>{`${this.state.first.toUpperCase()} ${this.state.last.toUpperCase()}`}</p>
          <i class='material-icons' onClick={() => this.setState({dropdown: !this.state.dropdown})}
          style={{marginTop: '15px'}} >keyboard_arrow_down</i>
           { this.state.dropdown ?
            <DropDown 
            open={this.state.open}
            logout={this.logout}
            delete={this.deleteAccount}/>
              : null }

          </MenuIcon>
        </Header>
        <SideBar
          open={this.state.open}
          disableOverlayClick={true}
          handleStateChange={state => this.handleStateChange(state)}
        >
          <Nav logout={this.logout} />
        </SideBar>


          <TodoList toggleEdit={this.toggleEdit} />
          {this.renderEditTask()}

        {/* <Chart/> */}
        <Weather />
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
)(UserDashboard);
