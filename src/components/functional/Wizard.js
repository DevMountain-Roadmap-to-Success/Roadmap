import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'



class Wizard extends React.Component {
    state = {
        blockOne: false,
        blockTwo: false,
        blockThree: false
    }

    handleBlockPicker = (event) => {
        this.setState(prevState => { return { [event.target.type]: !prevState.event.target.type } })
    };

    displayBlockOne = () => {
        if (this.state.blockOne) {
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
                    <button value={this.state.blockOne} onClick={this.handleBlockPicker}>Block 1</button>
                    <button value={this.state.blockTwo} onClick={this.handleBlockPicker}>Block 2</button>
                    <button vlaue={this.state.blockThree} onClick={this.handleBlockPicker}>Block 3</button>
                    </div>
                </Modal>
            )
        }
    };

    displayBlockTwo = () => { };

    displayBlockThree = () => { };

    render() {
        return (
            <div>

            </div>
        )
    }
}


export default Wizard