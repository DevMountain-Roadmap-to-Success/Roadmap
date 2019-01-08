import React from "react";
import Header from "./functional/Header";
import Nav from "./functional/Nav";
import codewars from "../assets/codewars.png";
import udemy from "../assets/udemy.png";
import pluralsight from "../assets/pluralsight.png";
import bookshelf from "../assets/bookshelf.jpg";
import styled from "styled-components";
import SideBar from "./functional/SideBar";
import Dashboard, { addWidget } from "react-dazzle";
import "react-dazzle/lib/style/style.css";
import { Link } from "react-router-dom";

const link = {
  textDecoration: "none",
  color: "white",
  marginRight: "5%"
};
const Box = styled.div`
  display: flex;
  flex-direction: column;
  block-size: inherit;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
  font-family: arial;
  font-weight: lighter;
  line-height: 20px;
  /* background-color: ${props => props.backgroundColor || "white"}; */
  /* color: ${props => props.color || "white"}; */
  /* box-shadow: 1px .5px .5px 1px rgb(102, 102, 102); */

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
  }
  li { 
      font-size: 14px;
      text-align: left;
  }
`;
const BookWrapper = styled.div`
  width: 30%;
  height: 500px;
  background-image: url(${bookshelf});
  background-size: cover;
  padding: 20px 20px;
  color: white;
  line-height: 20px;
  font-size: 18px;
  h1 {
    color: white;
    font-size: 22px;
    text-align: center;
    font-weight: bold;
  }
  li {
    justify-content: space-evenly;
    width: 80%;
    list-style: none;
  }
  h6 {
    font-size: 14px;
  }
`;
const BoxWrapper = styled.div`
  width: 350px;
  height: 200px;
  background-color: black;
  color: white;
  display: flex;
  border: white thin solid;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: auto;
  height: ${props => props.height || "90px"};
`;
const MainContent = styled.div`
  text-align: left;
  display: block;
  box-sizing: inherit;
`;
const Div = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-template-rows: 260px 260px 260px auto;
  grid-gap: 1rem;
`;

export const box1 = () => {
  return (
    <Box>
      <a href="http://www.codewars.com">
        <Logo src={codewars} alt="logo" />
        <h1>
          Improve <br /> Your Code
          <br /> With CodeWars
        </h1>
      </a>
      <h6>Code 2 hours everyday</h6>
    </Box>
  );
};
export const box2 = () => {
  return (
    <Box>
      <a href="http://www.pluralsight.com">
        <Logo src={pluralsight} alt="logo" />

        <h1>
          See Your Skill IQ
          <br />
          At PluralSight
        </h1>
      </a>
      <h6>Test your knowledge</h6>
    </Box>
  );
};

export const box3 = () => {
  return (
    <Box>
      <a href="http://www.udemy.com">
        <Logo src={udemy} alt="logo" />
        <h1 fontSize="18px">
          Learn a New Language
          <br /> Improve What You Know
        </h1>
      </a>
      <h6>Online Courses with Udemy</h6>
    </Box>
  );
};

export const box4 = () => {
  return (
    <Box>
      <h1 fontSize="18px">Build Your Portfolio</h1>
    </Box>
  );
};
const Box4 = () => {
  return (
    <Box>
      <a
        style={{ textDecoration: "none", color: "white" }}
        href="https://medium.freecodecamp.org/15-web-developer-portfolios-to-inspire-you-137fb1743cae"
      >
        <li style={{ textAlign: "left" }}>
          15 Web Developer Portfolios to Inspire You
        </li>
      </a>
      <a
        href="https://www.canva.com/learn/portfolio/"
        style={{ textDecoration: "none", color: "white" }}
      >
        <li style={{ textAlign: "left" }}>
          Awesome Portfolio with 20 Pro Tips
        </li>
      </a>
      <a
        href="https://collegeinfogeek.com/personal-website-examples/"
        style={{ textDecoration: "none", color: "white" }}
      >
        <li style={{ textAlign: "left" }}>50 Of the Best Personal Websites</li>
      </a>
      <a
        style={{ textDecoration: "none", color: "white" }}
        href="https://www.mockplus.com/blog/post/web-developer-portfolio"
      >
        <h6>
          <li style={{ textAlign: "left" }}>
            Top 12 Portfolios for Inspiration
          </li>
        </h6>
      </a>
    </Box>
  );
};

export const box5 = () => {
  return (
    <Box>
      <h1>Articles to Read</h1>

      <a
        style={{ color: "white", fontSize: "14px" }}
        href="https://blog.teamtreehouse.com/improve-coding-confidence"
      >
        <li>5 Excellent Ways to Improve Your Coding Confidence</li>
      </a>
      <a
        style={{ color: "white", fontSize: "14px" }}
        href="https://medium.freecodecamp.org/how-to-read-your-way-to-becoming-a-better-developer-b6432fa5bc0c"
      >
        <li>Read Your Way to Becoming a Better Developer</li>
      </a>
    </Box>
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
    open: false,
    widgets: {
      Box1: {
        type: box1
      },
      Box2: {
        type: box2
      },
      Box3: {
        type: box3
      },
      Box4: {
        type: box4
      },
      Box5: {
        type: box5
      },
      Box6: {
        type: box6
      },
      Box7: {
        type: box7
      }
    },
    layout: {
      rows: [
        {
          columns: [
            {
              className: "col-md-4",
              widgets: [{ key: "Box1" }]
            },
            {
              className: "col-ms-5 col-md-3",
              widgets: [{ key: "Box2" }]
            },
            {
              className: "col-md-5 col-ms-8",
              widgets: [{ key: "Box3" }]
            },
            {
              className: "col-md-3",
              widgets: [{ key: "Box4" }]
            },
            {
              className: "col-md-3",
              widgets: [{ key: "Box5" }]
            },
            {
              className: "col-ms-6",
              widgets: [{ key: "Box6" }]
            },
            {
              className: "col-ms-5",
              widgets: [{ key: "Box7" }]
            }
          ]
        }
      ]
    }
  };
  onAdd = (layout, rowIndex, columnIndex, type) => {
    // Add another Greetings Widget
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, type)
    });
  };
  onMove = layout => {
    this.setState({
      layout: layout
    });
  };
  onRemove = layout => {
    this.setState({
      layout: layout
    });
  };
  
  render() {
    console.log(this.state.layout);
    return (
      <div style={{ backgroundColor: "#2F3642", height: '100vh'}}>
        <Header>
          <h1>Resources</h1>
        </Header>
        <SideBar >
            <Link to="/dashboard" >
              <i className="material-icons">home</i>Dashboard
            </Link>
        </SideBar>

        <Dashboard
          onMove={this.onMove}
          onRemove={this.onRemove}
          onAdd={this.onAdd}
          editable={true}
          widgets={this.state.widgets}
          layout={this.state.layout}
        />
      </div>
    );
  }
}
export default Resources;
