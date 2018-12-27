import React from 'react'
import styled from 'styled-components'

const Menu = styled.menu `
    width: 120px;
    height:60px;
    display: inline-block;
    background-color: white;
    position: absolute;
    color: black;
    top: 30px;
    right: 150px;
    display: flex;
    flex-direction: column;
    text-indent: 5px;

    span {
        font-size: 20px;
        font-family: 'Nunito';
        cursor: pointer;
    }
    span:hover {
        background-color: lightgrey;
        color: white;
       
    }

`


const DropDown = props => {
    console.log(props)
    return (
      <Menu>
          {props.children}
      </Menu>
    )
}


export default DropDown