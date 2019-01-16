import React from "react";
import Header from "./Header";
import codewars from "../assets/codewars.png";
import udemy from "../assets/udemy.png";
import pluralsight from "../assets/pluralsight.png";
import { TwitterTweet } from "./widgets/Twitter";
import styled from "styled-components";
import "react-dazzle/lib/style/style.css";
import scotch from '../assets/scotch.png'

const Card = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || "row"};
  block-size: inherit;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
  font-family: arial;
  font-weight: lighter;
  line-height: 20px;
  width: 400px;
  margin: 10px;
  height: ${props => props.height || "250px"};
  box-shadow: ${props => props.shadow || '1px 1px 1px 1px rgb(220, 220, 220)'};
  border-radius: 5px;
  color: black;

  h1 {
    text-align: center;
    font-weight: lighter;
    line-height: 30px;
    float: right;
  }
  a {
    display: flex;
    text-decoration: none;
    color: black;
    width: 100%;
    justify-content: space-evenly;
  }
  h6 {
    font-size: 14px;
    text-align: center;
    color: black;
  }
  li {
    font-size: 14px;
    text-align: left;
  }
`;
const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height};
  width: 500px;
  padding: 30px;

  justify-content: center;
  box-shadow: .5px .5px .5px 2px #00BDBF;
  border-radius: 5px;
  li {
    font-size: 17px;
  }
  .title {
    text-align: center;
    line-height: 30px;
    font-size: 24px;
    font-weight: bolder;
    color: black;
    margin-bottom: 10px;
  }
`;
const Link = styled.a`
  font-size: 16px;
  color: black;
  line-height: 25px;
`;

const Logo = styled.img`
  width: ${props => props.width || "200px"};
  height: ${props => props.height || "200px"};
`;

const ResourceContainer = styled.div`
  display: flex;
  height: 1000px;
  justify-content: center;

  .containers {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: 'space-evenly';
    margin: 20px;
  }
`;
export const Box = props => {
  console.log(props);
  return !props.box ? (
    <Card shadow={props.shadow} >{props.children}</Card>
  ) : (
    <Card2 height={props.height}>{props.children}</Card2>
  );
};

export const box6 = () => {
  return (
    <Box backgroundColor="white" color="black">
      <div style={{ marginBottom: "13%" }}>
        <li style={{ display: "flex" }}>
          <Logo
            src="https://images-na.ssl-images-amazon.com/images/I/514mHNWl0wL._SX330_BO1,204,203,200_.jpg"
            alt=""
            height="200px"
          />
          You Don't Know JS
          <br />
          By Kyle Simpson
        </li>
      </div>
    </Box>
  );
};
export const box7 = () => {
  return (
    <>
      <Box backgroundColor="white" color="black">
        <li style={{ display: "flex" }}>
          <Logo
            height="200px"
            src="https://images-na.ssl-images-amazon.com/images/I/51mEe0St6-L._SX258_BO1,204,203,200_.jpg"
          />
          Fullstack React <br />
          By: Accomazzo Anthony (Author),
          <br /> Murray Nathaniel (Author), <br />
          Lerner Ari (Author)
        </li>
      </Box>
      <Box backgroundColor="white" color="black">
        <li style={{ display: "flex" }}>
          <Logo
            height="200px"
            src="https://images-na.ssl-images-amazon.com/images/I/41gYvqhm2yL.jpg"
            alt=""
          />
        </li>
      </Box>
    </>
  );
};

class Resources extends React.Component {
  state = {
    open: false
  };

  render() {
    return (
      <>
        <Header>
          <h1>Resources</h1>
        </Header>
        <ResourceContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <a style={{ width: "50%" }} href="http://www.codewars.com">
                <Logo
                  src={codewars}
                  alt="logo"
                  height="200px"
                  width="200px"
                  style={{ marginLeft: "10px" }}
                />
              </a>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <h1>
                  Improve <br /> Your Code
                  <br /> With CodeWars
                </h1>
                <h6>Code 2 hours everyday</h6>
              </div>
            </Box>
            <Box shadow='.5px .5px .5px 2px #00BDBF'>
              <a style={{ width: "50%" }} href="http://www.pluralsight.com">
                <Logo src={pluralsight} alt="logo" />
              </a>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <h1>
                  See Your Skill IQ
                  <br />
                  At PluralSight
                </h1>
                <h6>Test your knowledge</h6>
              </div>
            </Box>
            <Box>
              <a href="http://www.udemy.com">
                <Logo
                  src={udemy}
                  alt="logo"
                  style={{ width: "120px", height: "120px" }}
                />
              </a>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight: "20px"
                }}
              >
                <h1 fontSize="18px">
                  Learn a New Language
                  <br /> Improve What You Know
                </h1>
                <h6>Online Courses with Udemy</h6>
              </div>
            </Box>
          </div>
          <div className='containers'>
            <TwitterTweet id={"1067500779567636480"} />

            <Box box="box2" height='200px'>
              <a href="/resources" className="title">
                Articles to Read
              </a>
              <p>
                <Link href="https://blog.teamtreehouse.com/improve-coding-confidence">
                  <li>5 Excellent Ways to Improve Your Coding Confidence</li>
                </Link>

                <Link href="https://medium.freecodecamp.org/how-to-read-your-way-to-becoming-a-better-developer-b6432fa5bc0c">
                  <li>Read Your Way to Becoming a Better Developer</li>
                </Link>
              </p>
            </Box>
          </div>
          <div className='containers'>
            <Box box="box2" height='300px'>
              <a href="/resources" className="title">
                Improve Your Portfolio
              </a>
              <Link href="https://medium.freecodecamp.org/15-web-developer-portfolios-to-inspire-you-137fb1743cae">
                <li>15 Web Developer Portfolios to Inspire You</li>
              </Link>
              <Link href="https://www.canva.com/learn/portfolio/">
                <li>Awesome Portfolio with 20 Pro Tips</li>
              </Link>
              <Link href="https://collegeinfogeek.com/personal-website-examples/">
                <li>50 Of the Best Personal Websites</li>
              </Link>
              <Link href="https://www.mockplus.com/blog/post/web-developer-portfolio">
                <li> Top 12 Portfolios for Inspiration</li>
              </Link>
            </Box>
            <Box>
              <a style={{ width: "50%" }} href="https://scotch.io/">
                <Logo
                  src={scotch}
                  alt="logo"
                  height="200px"
                  width="200px"
                  style={{ marginLeft: "10px" }}
                />
              </a>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <h1>
                fun and practical web development.<br/>
                 not just the code,<br/>
                  but the reasons behind it
                </h1>

              </div>
            </Box>
          
            <TwitterTweet id={"984149102240894976"} style={{ height: 300 }} />
          </div>
        </ResourceContainer>

      </>
    );
  }
}
export default Resources;
