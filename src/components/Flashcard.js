import React, { Component } from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';
import FlashcardMenu from './functional/FlashcardMenu';

const Div = styled.div`
Div{
  display: flex;
width: 100vw;
}

.box{
  display:flex;
  height: 470px;
  width: 670px;
  background-color: black;
  border-radius: 5px;
}

.frame{
  margin-left: 35px;
  margin-top: 35px;
}

h1{
  margin-left: 220px;
  margin-top: 10px;
  color: white;
}

h2{
  display:flex;
  justify-content: space-between;
  margin-left: -190px;
  margin-top: 445px;
  color: white;
}
`



class Flashcard extends Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false,
            links: [{ name: 'React / Node Interview Questions', link: 'https://quizlet.com/350088308/flashcards/embed' },
            { name: 'Option 2', link: 'https://quizlet.com/350088308/flashcards/embed' },
            { name: 'Option 3', link: 'https://quizlet.com/350088308/flashcards/embed' }],
        }
    };

    render() {

        let handleOpenClose = () => {
            console.log(this.state.menuOpen)
            this.setState(prevState => {
                return { menuOpen: !prevState.menuOpen } })
        };

        let handleShowMenu = () => {
            if (this.state.menuOpen === true) {
                return (<FlashcardMenu
                    data={this.state.links}
                    open={this.state.open}
                />)
            }
        };

        return (
            <Div className="page">


                <div className="box" id={0}>
                <button onClick={() => handleOpenClose()}>Menu</button>
                {/* <FlashcardMenu data={this.state.links} /> */}
                {handleShowMenu()}

                    <h1 id={0} >React / Node Interview Questions</h1>






                    {/* <Iframe className="frame"
            url="https://quizlet.com/350088308/flashcards/embed"
            width="600px"
            height="400px"
            /> */}
                   
                </div>





            </Div>
        )
    }
};

export default Flashcard;