import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
background-color:${props => props.backgroundColor || '#00AAE8'};
color: white;
width: 170px;
height: 40px;
font-size: 15px;
font-weight: 600;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
border: ${props => props.border || 'none' };
border-radius: 3px;

@media(max-width: 1300px){
    width: 140px;
    height: 35px;
    font-size: 13px;
}
`

const Button = (props) => {
    console.log(props)
    return (
       
          <StyledButton {...props} >{props.name}</StyledButton>
       
    )
}

export default Button