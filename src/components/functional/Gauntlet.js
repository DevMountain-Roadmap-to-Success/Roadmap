import React from 'react';
import Iframe from 'react-iframe';
import styled from "styled-components";

const Gaunt = styled.div`


/* .gauntlet{
  margin-left: 5px;
  margin-top: 30px;
} */
`

const Frame = styled(Iframe)`
position: absolute;
left: 0;
margin-left: 80px;
margin-top:57px;
background-color: gray;
`

const Gauntlet = () => {
    return (
        <Gaunt>
            <Frame className="frame"
                url="https://gauntlet.surge.sh/"
                width="900px"
                height="700px"
            />
        </Gaunt>
    )
}

export default Gauntlet;