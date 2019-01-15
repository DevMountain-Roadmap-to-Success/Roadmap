import React from "react";
import styled from "styled-components";
import ReactDOM from 'react-dom'



const Container = styled.div`
  width: auto;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.692);
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

const modalRoot = document.getElementById('modal-root')

class Modal extends React.Component{
  el = document.createElement('div')
  componentDidMount = () => {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount = () => {
    modalRoot.removeChild(this.el)
  }
  render(){
    return ReactDOM.createPortal(
        <Container open={this.props.open}>
            <ModalWrapper {...this.props}>   
            {this.props.children}
            </ModalWrapper>
         </Container>,
         this.el
         
    ) 
  }
}

export default Modal