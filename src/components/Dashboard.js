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
// import Dashboard, { addWidget } from "react-dazzle";
import EditTask from "./functional/EditTask";
import Draggable from "react-draggable";

const PlayGround = styled(Repl)`
  width: 400px;
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
const NavLink = styled(Nav)`
  a {
    margin-right: 5%;
  }
`
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "H",
      last: "I",
      open: false,
      header: false,
      description: "",
      widgets: {
        Todo: {
          type: TodoList
        },
        Playground: {
          type: PlayGround
        }
      },
      layout: {
        rows: [
          {
            columns: [
              {
                className: "col-md-3",
                widgets: [{ key: "Todo" }]
              },
              {
                className: "col-md-5",
                widgets: [{ key: "Playground" }]
              }
            ]
          }
        ]
      }
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
        this.props.history.push("/");
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
            <>
              <span onClick={this.logout}>
               Logout
              </span>
              <Link to="/account">Account</Link>
            </>
          
            </DropDown>
      );
    }
  };
  onMove = layout => {
    this.setState({
      layout: layout
    });
  };
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
    let first = this.state.first.split("");
    let last = this.state.last.split("");
    console.log(this.props.getUser, this.props.user);
    return (
      <div className="dashboard_main">
        <Header >
          <NavLink width='50%'
            toggleMenu={this.toggleMenu}
            render={
              <>
                <Link to="/calendar">
                  <i className="fa fa-calendar">CALENDAR</i>
                </Link>
                <Link to="/playground">CODE PLAYGROUND</Link>
                <Link to="/jobprep">JOB PREP</Link>
                <Link to="/resources">RESOURCES</Link>
                <Menu onClick={this.toggleMenu}>
                  {`${first[0]} ${last[0]}`}
                </Menu>
              </>
            }
          />
          {this.showMenu()}
        </Header>
        <div style={{ position: "relative", width: "400px" }}>
          <TodoList toggleEdit={this.toggleEdit} />
          {this.renderEditTask()}
        </div>

        {/* <PlayGround header={this.state.header} /> */}
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
