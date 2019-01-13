import React from "react";
import styled from "styled-components";
import Header from "../Header";


const Container = styled.iframe`
 height: 90vh;
 width: 100vw;
`;

const Sandbox = props => {
  return (
    <>
    <Header/>
      <Container
         src='https://codepen.io/challenges/' title='sandbox' />
    </>

  );
};

export default Sandbox;
