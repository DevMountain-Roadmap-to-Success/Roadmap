import React from 'react'
import styled from 'styled-components'



const CircleDiv = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #00AAE8;
  color: white;
  font-size: 18px;
  margin-right: 5%;
  text-align: center;
  line-height: 60px;
  cursor: pointer;

`

const Menu = (props) => {
    console.log(props)
    return (
        <>
        <CircleDiv onClick={props.onClick}>
        {props.children}
        </CircleDiv>
        </>
    )
}

export default Menu