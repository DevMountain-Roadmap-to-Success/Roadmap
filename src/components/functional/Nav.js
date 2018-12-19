import React from 'react'
import styled from 'styled-components'


const NavLinks = styled.span`
    color: ${props => props.color || 'white'};
    font-size: 15.5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 550;
    letter-spacing: .5px;
    


    a {
        color: white;
        text-decoration: none;

    }
    @media(max-width: 1100px){
       display: none;
    }
`

const Nav = (props) => {
    return (

    <NavLinks {...props}>
    <>{props.name}</>
    {props.render}
    </NavLinks>
    )
}

export default Nav