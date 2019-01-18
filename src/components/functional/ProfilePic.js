import React from 'react'
import styled from 'styled-components'
import DropDown from './DropDown'
import { MenuItem } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
const CircleDiv = styled.div`
  height: 60px;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: 'space-evenly';
  position: absolute;
  right: 3%;
  cursor: pointer;   
    @media (max-width: 950px){
       display: none;     
    }
    p {
        margin-left: 15px;
    }
`


const MenuIcon = (props) => {
    
    return (
<>
        <CircleDiv {...props}
        onClick={props.onClick}>
        {props.children}
        </CircleDiv>
        { props.dropdown? 
         <DropDown
         open={props.dropdown}>
         <NavLink activeClassName='current' to='/profile/edit'>Edit Profile</NavLink>
         <MenuItem onClick={props.logout}>Logout</MenuItem>  
         <MenuItem onClick={props.delete}>Delete Account</MenuItem>
        
       
        </DropDown>  : null }
</>
    )
}

export default MenuIcon