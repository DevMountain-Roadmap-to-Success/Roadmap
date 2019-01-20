import React from 'react'
import Login from './Login'
import {Container} from './Styles'
import ProfileForm from './profile/ProfileForm'




const Home = (props) => {
    console.log(props)
          return props.login === 'login'? (
              <Container>
                  <Login {...props}/>
                  
              </Container>

          ) : (
            <Container>
          <ProfileForm {...props}/>
          </Container>
          )
      }



export default Home