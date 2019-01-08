import React from "react";
import styled from "styled-components";
import Header from "../Header";
import { Link } from "react-router-dom";
import Nav from "../functional/Nav";
import Draggable from "react-draggable";

const Container = styled.iframe`
  position: ${props => props.position || "unset"};
  /* right: 5%;
   top: 17%; */
  margin-top: ${props => props.marginTop || "3%"};
  margin-left: ${props => props.marginLeft || "10%"};
  width: ${props => props.width || "400px"};
  height: ${props => props.height || "400px"};
`;
const divStyle = {
  display: "flex",
  height: "100vh",
  justifyContent: "center"
  // alignItems: 'center'
};
const link = {
  marginRight: "5%"
};

const PlayGround = props => {
  return (
    // <>
    // {props.header === false ? (
    //     null
    // ) : (
    // <Header home='home' >
    // <Nav
    // justifyContent='flex-end'
    // render={
    // <>
    // <Link to='/dashboard' style={link} >DASHBOARD</Link>
    // <Link to='/jobprep' style={link} >JOB PREP</Link> </>}/>
    // </Header>
    // )}
    <Draggable defaultPosition={{x: 1100, y: -300}}>
      <Container
        {...props}
        src="https://repl.it/community/classrooms/14714/assignments/53105"
        width="100%"
        height="100%"
      />
    </Draggable>
  );
};

export default PlayGround;
