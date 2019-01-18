//dependencies
import React, { Component } from 'react';
// import Iframe from 'react-iframe';
//styling imports
import styled from 'styled-components';
import Button from './functional/Button';
//components
import FlashcardMenu from './functional/FlashcardMenu';

import {toggle, idCheck} from './../Tests/Logic/logic_Jared';

//styling
const Div = styled.div`
position: relative;
/* 
.box{
  display:flex;
  height: 700px;
  width: 600px;
  background-color: #F0F0F0;
  border-radius: 5px;
} */

.frame{
  margin-left: 35px;
  margin-top: 65px;
}

span{
  position: absolute;
  color: white;
  font-size: 24px;
  display: flex;
}
span > h1 {
    line-height: 50px;
    text-align: center;
    
}

h2{
  display:flex;
  justify-content: space-between;
  margin-left: -190px;
  margin-top: 445px;
  color: #455358;
}
`
const MenuButton = styled(Button)`
margin-top: 5px; 
margin-left: 5px; 
width: 90px;
height: 37px;
z-index: 100;
margin-right: 10px;
background-color:  #455358;
border-radius: 3px;
font-weight: lighter;
outline: none;

`
const Iframe = styled.iframe`
    height: 650px;
    width: 600px;

`

class Flashcard extends Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false,
            title: 'React / Node Interview Questions',
            currentLink: 'https://quizlet.com/360579833/flashcards/embed?i=1u7wu1&x=1jj1',
            links: [{ name: 'React / Node Interview Questions', link: 'https://quizlet.com/360579833/flashcards/embed?i=1u7wu1&x=1jj1' },
            { name: 'Javascript Interview Questions', link: 'https://quizlet.com/360578052/flashcards/embed?i=1u7wu1&x=1jj1' },
            { name: 'HTML / CSS Interview Questions', link: 'https://quizlet.com/356801642/flashcards/embed?i=1u7wu1&x=1jj1' }],
        }
    };



    render() {
        //opens and closes the menu
        let handleOpenClose = () => {
            toggle(this.state.menuOpen)
            this.setState(prevState => {
                return { menuOpen: !prevState.menuOpen }
            })
        };
        //this renders the menu
        let handleShowMenu = () => {
            if (this.state.menuOpen === true) {
                return (<FlashcardMenu
                    data={this.state.links}
                    open={this.state.open}
                    select={handleClick}
                />)
            }
        };

        //This handles what displays in the component by what is clicked on the menu
        let handleClick = (id) => {
            let newData = this.state.links[id]
            idCheck(id)
            this.setState({
                title: newData.name,
                currentLink: newData.link,
                menuOpen: false
            })
        };


        return (
            <Div className="page" >
                    {handleShowMenu()}
                   
                    <span id={0} > <MenuButton onClick={() => handleOpenClose()}name='Choose Topic'/><h1>{this.state.title}</h1></span>

                    <Iframe title="quizlet"
                        src={this.state.currentLink}
                        width={this.props.width}
                        height={this.props.height}/>

            </Div>
        )
    }
};



export default Flashcard;