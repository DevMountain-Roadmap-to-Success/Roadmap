import React from 'react'
import styled from 'styled-components'


const NavLinks = styled.nav`
    color: ${props => props.color || 'white'};
    font-size: 15.5px;
    font-weight: 400;
    letter-spacing: .5px;
    width: ${props => props.width || '60%'};
    display: flex;
    margin-right: 3%;
    justify-content: space-evenly;
    align-items: center;
    a {
        color: white;
        text-decoration: none;
    }
    @media (max-width: 1500px) {
        font-size: 12px;
    }
    @media (max-width: 1100px) {
        display: none;
    }
  
  
`

const Nav = (props) => {
    console.log(props)
    return (
  
    <>
    <NavLinks {...props }>
    {props.name}
    {props.children}
    {props.render}
    </NavLinks>
    </>

    )
}

export default Nav