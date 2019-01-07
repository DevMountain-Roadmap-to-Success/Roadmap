import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import {FormControl, FormGroup} from 'react-bootstrap'

const Form = styled.form`
width: 100%;
height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export default (props) => {

    return (
        <Form {...props}>
            {props.children}

        </Form>
        

    )
}
