import React from 'react'
import {Form} from './ElementStyles'
// import Input from './Input'
// import {FormControl, FormGroup} from 'react-bootstrap'



export default (props) => {

    return (
        <Form {...props}>
            {props.children}

        </Form>
        

    )
}
