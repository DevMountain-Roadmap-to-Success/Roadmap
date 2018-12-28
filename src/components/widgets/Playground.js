import React from 'react'
import styled from 'styled-components'
import Header from '../functional/Header'
import {Link} from 'react-router-dom'
import Nav from '../functional/Nav'

const Container = styled.iframe` 
   position: ${props => props.position || 'unset'};
   /* right: 5%;
   top: 17%; */
   margin-top: ${props => props.marginTop || '3%'};
   margin-left: ${props => props.marginLeft || '10%'};
    width: ${props => props.width || '80vw'};
    height: ${props => props.height || '80vh'};

`
const divStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    // alignItems: 'center'
}
const link = {
    marginRight: '5%',
}

const PlayGround = (props) => {
        return (
            <>
            {props.header === false ? (
                null
            ) : (
            <Header home='home' >
            <Nav
            justifyContent='flex-end' 
            render={ 
            <>
            <Link to='/dashboard' style={link} >DASHBOARD</Link>
            <Link to='/jobprep' style={link} >JOB PREP</Link> </>}/>
            </Header>
            )}
            <Container {...props}
                 src='https://repl.it/community/classrooms/14714/assignments/53105' />
            </>
        )
    }


export default PlayGround
