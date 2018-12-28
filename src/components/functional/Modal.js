import React from "react";
import styled from "styled-components";



const Container = styled.section`
  width: auto;
  height: 100vh;
  position: relative;
  background-color: rgba(22, 22, 22, 0.63);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: ${props => props.width || '350px'};
  height: ${props =>  props.height || '400px'};
  background-color: white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative; 
img {
    position: absolute;
    right: 5%;
    top: 5%;
  }
`
const Modal = props => {
    return (
        <Container>
            <ModalWrapper {...props}>   
            {props.children}
            </ModalWrapper>
        </Container>
    )
}

export default Modal