import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card';

const WizardBox = styled.div `
    width: 400px;
    height: 500px;
    margin-top: 160px;

    div {
        padding: 10px;
        font-size: 14px;
    }

`// var color = { backgroundColor: "rgb(122, 202, 248)" };
// } else if (this.state.priority === 2) {
//   color = { backgroundColor: "rgb(244, 247, 113)" };
// } else if (this.state.priority === 1) {
//   color = { backgroundColor: "rgb(255, 87, 87)" };
// } else if (this.state.priority === 4) {
//   color = {backgroundColor: 'rgb(111, 253, 142)'}
// }


function Wizard (props){
  
            return (

                <WizardBox>
                    <Card style={{height: '100%', width:'100%'}}>
                   
                    <div style={{backgroundColor: "rgb(122, 202, 248)", height: '60px', width: '100px' }}>Practice Code: 2 hours daily</div>
                  
                    <div style={{backgroundColor:  "rgb(244, 247, 113)" , height: '60px', width: '100px' }}>  Jop Prep: 1 hour daily</div>
                    <div style={{backgroundColor:  "rgb(255, 87, 87)", height: '60px', width: '100px' }}>Improve Portfolio: 4 hours daily</div>
                    <div style={{backgroundColor: 'rgb(111, 253, 142)', height: '60px', width: '100px' }}>Other</div>

                    </Card>

                    </WizardBox>
            )
        }
    


export default Wizard