import React from "react";
import styled from "styled-components";



const Container = styled.section`
  width: auto;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(22, 22, 22, 0.63);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;


`;

const ModalWrapper = styled.div`
  width: ${props => props.width || '70%'};
  height: ${props =>  props.height || '650px'};
  background-color: white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;


`
const Modal = props => {
    return (
        <Container >
            <ModalWrapper {...props}>   
            {props.children}
            </ModalWrapper>
         </Container>
    )
}

export default Modal