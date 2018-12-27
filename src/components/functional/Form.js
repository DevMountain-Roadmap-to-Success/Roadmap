import React from 'react'
import styled from 'styled-components'
import Input from './Input'

const Form = styled.form`
width: 100%;
height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export default (props, render) => {

    return (
        <Form {...props}>
            {props.render.props.children}
        
        </Form>
        

    )
}
