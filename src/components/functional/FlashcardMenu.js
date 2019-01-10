import React from 'react';
//style imports
import styled from 'styled-components';
import {Menu} from './ElementStyles';

//styling
const Menu1 = styled(Menu) `
    position: absolute;
    right: unset;
    left: 8px;
    width: 300px;
    z-index: 100px;
    margin-top: -11px;
`


const FlashcardMenu = (props) => {
    const {data} = props;


   //This maps all of the menu options into selectable items on the menu.
   let handleDisplay = () => {
        let arr = [];
        for(let i in data){
            arr.push( <li key={i} onClick={() => props.select(i)}>{data[i].name}</li>)
        }
        return arr
    }
    return(
        <Menu1 open={props.open}>
            {handleDisplay()}
            
        </Menu1>
    )
};

export default FlashcardMenu;