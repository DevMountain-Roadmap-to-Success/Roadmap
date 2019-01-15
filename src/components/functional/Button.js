import React from 'react'
import {StyledButton} from './ElementStyles'



const Button = (props) => {

    return (
       
          <StyledButton {...props} >{props.name}</StyledButton>
       
    )
}

export default Button