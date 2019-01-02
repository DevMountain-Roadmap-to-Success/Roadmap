import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Menu from './Menu'

const NavLinks = styled.nav`
    color: ${props => props.color || 'white'};
    font-size: 15.5px;
    font-weight: 400;
    letter-spacing: .5px;
    width: ${props => props.width || 'auto'};
    display: flex;
    margin-right: 3%;
    justify-content: ${props => props.justifyContent || 'space-between'};
    align-items: center;
    a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        font-family: 'Nunito';
        margin-right: '5%'
        
    }
    @media (max-width: 1500px) {
        a {
        font-size: 12px;
        }
    }
    @media (max-width: 1100px) {
        a {
        display: none;
        }
    }
    span {
        color: white;
    }
   
  
`

const Nav = (props) => {
    console.log(props)
    return (
  
    <>
    <NavLinks {...props}>
   {props.render.props.children}
    </NavLinks>
    </>

    )
}

export default Nav