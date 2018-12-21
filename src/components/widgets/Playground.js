import React, {Component} from 'react'
import styled from 'styled-components'

const Container = styled.div ` 
   position: absolute;
   right: 5%;
   top: 17%;
   box-shadow: 0px 2px 2px .5px rgb(68, 68, 68);
   display: flex;
    justify-content: center;
    align-items: center;
`

class PlayGround extends Component {
    render(){
        return (
            <Container>
            <iframe title='repl' frameborder="0" width="400px" height="400px" src="https://repl.it/@devmakers/Code-Challenge-1?lite=true"></iframe>
            </Container>
        )
    }
}

export default PlayGround
