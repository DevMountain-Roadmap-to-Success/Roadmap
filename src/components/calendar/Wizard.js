import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import DropDown from "../functional/DropDown";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "rgb(122, 202, 248)",
    zIndex: 1,
   
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
 
});
const WizardBox = styled.div`
  width: 20%;
  height: 640px;
  @media(max-width: 1100px){
      display: none;
    }
`;

const KeyCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 15px;
  .create {
    font-size: 18px;
    font-weight: bolder;
    padding-left: 10px;

  }
`;
const KeyTypes = styled.div`
  margin-top: 10%;
  position: relative;
  div {
    padding: 10px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
  }

  span {
    display: flex;
    line-height: 25px;
    margin-bottom: 5px;
    font-size: 16px;
    height: 70px;
    position: relative;

    @media(max-width: 1350px){
      font-size: 13px;
    }
    @media(max-width: 1250px){
      font-size: 10px;
    }
 
  }
 
  h1 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  i {
    cursor: pointer;
    position: absolute;
    right: 5px;
    content: none;
    font-size: 20px;
  }
`;
const DropInfo = styled(DropDown)`
  width: 300px;
  height: auto;
  font-size: 12px;
  right: unset;
  top: ${props => props.top || '90px'};
  left: 23%;
h1 {
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin-bottom: 8px;
}
  li {
    list-style-type: square;
  }
  .square-bullet {
    list-style-type: circle;
    text-indent: 10px;
  }

`;

class Wizard extends React.Component {
  state = { Skillsinfo: false, jobInfo: false, portfolioInfo: false };
 
  render() {
    const {classes} = this.props
    return (
      <WizardBox >
        {this.props.children}
        <KeyCard>
          <hr />
          <KeyTypes >
            <h1>Recommended Schedule</h1>
            <hr />
            <span>
              <div style={{ backgroundColor: "rgb(122, 202, 248)" }} />
              {`Build & Improve Portfolio`} - <br /> 4 hours daily{" "}
              <i onMouseEnter={() => this.setState({portfolioInfo: !this.state.portfolioInfo})}
               onMouseLeave={() =>
                this.setState({ portfolioInfo: !this.state.portfolioInfo })
              }

              className="fa fa-question-circle" ></i>
              {this.state.portfolioInfo ?
              <DropInfo open={this.state.portfolioInfo}>
              <>
              <h1>Make stuff</h1>
There is no better way to learn than to build things. Employers also love when you can say “I have built X with tech Y and this is what I learned. I would do this differently next time”.
             <li> New project in the stack we taught you - JS, Node, Postgres and PostgreSQL.</li>
<li>Re-write your personal project front-end in Angular, Vue or React.</li>
<li>Make something new.  It doesn’t have to be innovative.  You’re not starting a business, so clone, copy, repeat, show your dev skills not your product brainstorming skills.</li>
<li>I learned the most from cloning websites when I first started out. This will help refine your layout/CSS skills.</li>
<li>Make a toy problems repo and put in solutions to toy problems (With your own words/comments in the files)</li>
<li>Form another group and do a group project.  Hold each other accountable.</li>

</>


              </DropInfo> 
              : null }
            </span>

            <span>
              <div style={{ backgroundColor: "rgb(244, 247, 113)" }}> </div>
              Skill Growth - 2 hours daily{" "}
              <i
                onMouseEnter={() => this.setState(prevState => {return {skillsInfo: !prevState.skillsInfo}})}
                onMouseLeave={() =>
                  this.setState({ skillsInfo: !this.state.skillsInfo })
                }
                className="fa fa-question-circle" 
              >
               
              </i>
              {this.state.skillsInfo ? (
                <DropInfo top='170px'>
                  <>
                    <h1>Improve your JavaScript skills</h1>
                    <p>Javascript and problem solving are how you pass whiteboard
                    questions on the board and are essential for understanding
                    more complex applications and libraries.</p>
                    <li>You don’t know JS</li>
                    <li>
                      CodeWars - Be able to complete all of the level 8,and 7,
                      and 6{" "}
                    </li>
                    <li>
                      Learn Typescript - This will also help you A LOT with C#
                      (Both made by Microsoft)
                    </li>
                    <li>Learn three separate design patterns</li>
                  </>
                </DropInfo>
              ) : null}
            </span>
            <span>
              <div style={{ backgroundColor: "rgb(255, 87, 87)" }} />
              Jop Hunt - 2 hours daily{" "}
              <i
                onMouseEnter={() =>
                  this.setState({ jobInfo: !this.state.jobInfo })
                }
                onMouseLeave={() =>
                  this.setState({ jobInfo: !this.state.jobInfo })
                }
                className="fa fa-question-circle" 
              >

              </i>
              {this.state.jobInfo ? 
              <DropInfo top='250px'>
                <>
               <h1> Make a list of 40 companies.</h1>
<li>Separate them into A, B, C, D with A being the most ideal</li>
<li>Start applying to B companies, at 2 a day </li>
<li className='square-bullet'>This so you can update your resume, do a new cover letter, put in some sincere effort to each application</li>
<li>When you get an interview, skip applications for the next day and do interview prep/practice instead. Read up on the company. What do they do? What do you like about them? What do you dislike? What tech do they use? What are their reviews like on glassdoor?</li></>

                </DropInfo>
                
                 : null}
            </span>
            <span>
              <div style={{ backgroundColor: "rgb(111, 253, 142)" }} />
              Other
            </span>
          </KeyTypes>
          <div>
          <Fab color="primary" aria-label="Add" onClick={this.props.onClick} className={classes.fab}>
         <AddIcon
               
              />
           
            </Fab>
            <span className='create'>Add Schedule</span>
         </div>
        </KeyCard>
      </WizardBox>
    );
  }
}

export default withStyles(styles)(Wizard);
