import React from 'react'
import styled from 'styled-components'
// import menu from '../../assets/menu.png'
import DropDown from './DropDown'

const CircleDiv = styled.div`
  height: 60px;
  /* border-radius: 30px; */
  /* background-color: #00AAE8; */
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: 'space-evenly';
  position: absolute;
  right: 3%;
  cursor: pointer;   
    @media (max-width: 1100px){
       display: none;     
    }
    p {
        margin-left: 15px;
    }
`


const MenuIcon = (props) => {
    console.log(props)
    return (
<>
        <CircleDiv {...props}
        onClick={props.onClick}>
        {props.children}
        </CircleDiv>
        {props.dropdown? 
         <DropDown
         open={props.dropdown}
         logout={props.logout}
         delete={props.deleteAccount}
        />  : null }
</>
    )
}

export default MenuIcon