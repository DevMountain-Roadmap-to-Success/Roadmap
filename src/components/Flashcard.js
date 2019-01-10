//dependencies
import React, { Component } from 'react';
import Iframe from 'react-iframe';
//styling imports
import styled from 'styled-components';
import { StyledButton } from './functional/ElementStyles';
//components
import FlashcardMenu from './functional/FlashcardMenu';
;

//styling
const Div = styled.div`
Div{
  display: flex;
width: 100vw;
position: relative;
margin-left: 10px;
}

.box{
  display:flex;
  height: 500px;
  width: 670px;
  background-color: black;
  border-radius: 5px;
}

.frame{
  margin-left: 35px;
  margin-top: 65px;
}

h1{
  position: absolute;
  margin-left: 23%;
  margin-top: 10px;
  color: white;
  font-size: 28px;
}

h2{
  display:flex;
  justify-content: space-between;
  margin-left: -190px;
  margin-top: 445px;
  color: white;
}
`
const StyledButton1 = styled(StyledButton)`
margin-top: 8px;
margin-left: 8px;
width: 120px;
height: 40px;
margin-bottom:0px;
`


class Flashcard extends Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false,
            title: 'React / Node Interview Questions',
            currentLink: 'https://quizlet.com/350088308/flashcards/embed',
            links: [{ name: 'React / Node Interview Questions', link: 'https://quizlet.com/350088308/flashcards/embed' },
            { name: 'Javascript Interview Questions', link: 'https://quizlet.com/350088308/flashcards/embed' },
            { name: 'HTML / CSS Interview Questions', link: 'https://www.youtube.com/embed/3GA4vP7PKWg' }],
        }
    };



    render() {
        //opens and closes the menu
        let handleOpenClose = () => {
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
            this.setState({
                title: newData.name,
                currentLink: newData.link,
                menuOpen: false
            })
        };


        return (
            <Div className="page" >

               

                <div className="box" id={0}>
                    <StyledButton1 onClick={() => handleOpenClose()}>Choose Topic</StyledButton1>

                    {handleShowMenu()}

                    <h1 id={0} >{this.state.title}</h1>

                    <Iframe className="frame"
                        url={this.state.currentLink}
                        width="600px"
                        height="400px"
                    />

                </div>


            </Div>
        )
    }
};



export default Flashcard;