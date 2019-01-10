import React from 'react';
import { MenuItem } from 'react-bootstrap';
import {Menu} from './ElementStyles.js'



const DropDown = (props) => {
 
    return (
   
      <Menu open={props.open} {...props}>
        <MenuItem >Edit Profile</MenuItem>
        <MenuItem onClick={props.logout}>Logout</MenuItem>  
        <MenuItem onClick={props.delete}>Delete Account</MenuItem>
      </Menu>


    );
   
  }


export default DropDown;