import React from 'react';
import ReactDOM from 'react-dom'
import {Menu} from './ElementStyles.js'

const dropdownRoot = document.getElementById('drop-root')

class DropDown extends React.Component {
  el = document.createElement('div')
  componentDidMount = () => {
   dropdownRoot.appendChild(this.el)
  }

  componentWillUnmount = () => {
    dropdownRoot.removeChild(this.el)
  }
  render(){
    return ReactDOM.createPortal(
   
      <Menu open={this.props.open} {...this.props}  >
       {this.props.children}
      </Menu>,
      this.el


    );
   
  }
}


export default DropDown;