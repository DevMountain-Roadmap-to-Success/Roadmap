import React from 'react';
import styled from 'styled-components';
import {Menu} from './ElementStyles';

const Menu1 = styled(Menu) `
    /* top: 30px; */
    position: absolute;
    right: unset;
    left: 8px;
    width: 300px;
    /* height: 70px; */
    z-index: 100px;
    margin-top: -11px;
`

const FlashcardMenu = (props) => {
    const {data} = props;



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