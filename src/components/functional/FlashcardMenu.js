import React from 'react';
import styled from 'styled-components';
import DropDown from '../functional/DropDown'

const Menu = styled.menu `
    
`

const FlashcardMenu = (props) => {
    const {data} = props;



   let handleDisplay = () => {
        let arr = [];
        for(let i in data){
            arr.push( <li>{data[i].name}</li>)
        }
        return arr
    }
    return(
        <Menu open={props.open}>
            {handleDisplay()}
            
        </Menu>
    )
};

export default FlashcardMenu;