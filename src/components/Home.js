import React from 'react'
import Login from './Login'
import {Container} from './Styles'
import styled from 'styled-components'


const Home = (props) => {
          return (
              <Container>
                  <Login {...props}/>

              </Container>
          )
      }



export default Home