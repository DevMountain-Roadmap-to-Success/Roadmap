import React, { Component } from "react";
import styled from "styled-components";
import Header from './Header';
import { connect } from 'react-redux';
import { getPosition } from './../ducks/reducer';
import Flashcard from './Flashcard';
import Gauntlet from './functional/Gauntlet';

var ReactGridLayout = require('react-grid-layout');

const Drag = styled.div`
  display:flex;
  justify-content: space-around;
`

const Gaunt = styled.div`
background-color:black;
`

class JobPrep extends Component {

  render() {
    const { collision, compact } = this.props

    var layout = [
      { i: "flashcard", x: 20, y: 0, w: 12.5, h: 3.44, isResizable: false },
      { i: "gauntlet", x: 4, y: 0, w: 19.3, h: 5.4, isResizable: false, }
    ]

    return (
      <>
        <Header />
        <ReactGridLayout className="layout" layout={layout}
          style={{ position: `relative` }}
          cols={36}
          rows={12}
          width={2000}
          height={300}
          preventCollision={collision}
          compactType={compact ? 'vertical' : null}
          autoSize={false}
          margin={[1, 1]}
        >
          {/* <Div className="page"> */}

          {/* <Drag key='flashcard' className='testBox'>
            <Flashcard />
          </Drag> */}


          <Gaunt key='gauntlet'>

            <Gauntlet />
          </Gaunt>

        </ReactGridLayout>
      </>
    );
  }
}


const mapDispatchtoProps = {
  getPosition
}

const mapStatetoProps = (state) => {
  return {
    position: state.position
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(JobPrep);
