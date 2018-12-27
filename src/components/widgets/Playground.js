import React from 'react'
import styled from 'styled-components'
import Header from '../functional/Header'
import {Link} from 'react-router-dom'
import Nav from '../functional/Nav'

const Container = styled.iframe` 
   position: ${props => props.position};
   right: 5%;
   top: 17%;
   margin-top: ${props => props.marginTop};
   margin-left: ${props => props.marginLeft};
   box-shadow: 0px 2px 2px .5px rgb(68, 68, 68);
   display: flex;
    justify-content: center;
    align-items: center;
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
                 position='unset'
                 marginTop='3%' 
                 marginLeft='10%'
                 src='https://repl.it/community/classrooms/14714/assignments/53105' />
            </>
        )
    }


export default PlayGround
