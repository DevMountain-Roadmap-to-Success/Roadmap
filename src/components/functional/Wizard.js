import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";

const WizardBox = styled.div`
  width: 20%;
  height: 640px;
`;

const KeyCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 15px;

  
`;
const KeyTypes = styled.div `
    margin-top: 10%;
    div {
        padding: 10px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 10px;
}
  
  span {
    display: flex;
    line-height: 25px;
    margin-bottom: 5px;
    font-size: 16px;
    height: 70px;
  }
  h1 {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
  }
`

const Wizard = props => {
  return (
    <WizardBox>
      <KeyCard>
    <hr/>
     <KeyTypes>
         <h1>Recommended Schedule</h1><hr/>
        <span>
          <div style={{ backgroundColor: "rgb(122, 202, 248)" }} />Write
          Code - 2 hours daily
        </span>

        <span>
          <div style={{ backgroundColor: "rgb(244, 247, 113)" }}> </div>Jop
          Prep - 1 hour daily
        </span>
        <span>
          <div style={{ backgroundColor: "rgb(255, 87, 87)" }} /> {`Build & Improve
          Portfolio - 4 hours daily`}
        </span>
        <span>
          <div style={{ backgroundColor: "rgb(111, 253, 142)" }} />
          Other
        </span>
        </KeyTypes>
      </KeyCard>
    </WizardBox>
  );
};

export default Wizard;
