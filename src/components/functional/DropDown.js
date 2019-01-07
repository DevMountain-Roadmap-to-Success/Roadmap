import React from 'react';
import { MenuItem } from 'react-bootstrap';
import styled from 'styled-components'

const Menu = styled.menu`
    background-color: white;
    padding: 20px;
    width: 140px;
    position: absolute;
    z-index: 100;
    top: 50px;
    right: 2%;
    color: black;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgb(135, 135, 165);

    li {
     list-style: none;
     text-align: left;
     line-height: 30px;
    }
`

const DropDown = (props) => {
 
    return (
      <Menu open={props.open}>
        <MenuItem >Edit Profile</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>
    
        <MenuItem onClick={props.delete}>Delete Account</MenuItem>
      </Menu>

    );
   
  }


export default DropDown;