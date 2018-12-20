import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'



function Wizard (props){
  
            return (
                <Modal>
                    <div>
                    <p>Company One</p>
                    <input />
                    <p>Company Two</p>
                    <input />
                    <button>Add To Calendar</button>
                    </div>
                    <div>
                    <button  onClick={props.onClick}>Block 1</button>
                    <button  onClick={props.onClick}>Block 2</button>
                    <button  onClick={props.onClick}>Block 3</button>
                    </div>
                </Modal>
            )
        }
    


export default Wizard