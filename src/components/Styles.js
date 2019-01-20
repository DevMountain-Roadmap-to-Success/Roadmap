import styled from 'styled-components'
import NavLink from './functional/Nav'
import background from '../assets/background.jpg'
import Modal from './functional/Modal'
export const Box = styled.div `
    width: 60%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: thin solid lightgray;
    position: relative;
  .back {
    position: absolute;
    top: 3%;
    left: 3%;
    border: none;
    color: black;
    text-decoration: none;
  }

`
export const PictureBox = styled.div`
        box-shadow: ${props => props.shadow || '0px 2px 2px 1px rgb(190, 190, 190)'};
        width:${props => props.width ||   '210px'};
        height:${props => props.height ||  '210px'};
        content: contain;
        position: relative;
        border-radius: ${props => props.borderRadius};
        img {
        width: 100%;
        height: 100%;
        border-radius: ${props => props.borderRadius};
        
    }
    i {
      /* position: absolute; */

      bottom: 5%;
      z-index: 1000;
    }
    `
export const Profile = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

    h1 {
        font-size: 40px;
        font-weight: bold;
    }
`


export const ProfileModal = styled(Modal)`
    width: 400px;
    height: ${props => props.height || '200px'};

    .button {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
    i{
        position: absolute;
        right: 5px;
        top: 5px;
    }
    input {
        margin: 10px;
    }
    h1 {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    h3 {
      text-align: left;
      width: 80%;
      margin-bottom: 10px;
    }
`
//landing
export const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 140%;
  /* background-position-y: -300px; */
  position: relative;
  font-family: "Nunito", sans-serif;
  @media (max-width: 1200px) {
    background-size: 200%;
    background-position-y: 0;
  }
  h1 {
    font-size: 52px;
    margin-bottom: 7%;
    @media (max-width: 1500px) {
      font-size: 40px;
    }
  }
  h4 {
    font-size: 26px;
    margin-bottom: 15%;
    @media (max-width: 1500px) {
      font-size: 22px;
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(19, 19, 19, 0.397);
    position: fixed;
    top: 0px;
  }
  .content-box {
    color: white;
    margin-top: 5%;
    height: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    font-size: 20px;
    line-height: 50px;
    font-weight: 200;
    color: #00a7ee;
  }
  .videoIcon {
    margin-right: 5px;
  }
  .chatbox {
    position: absolute;
    right: 5%;
    bottom: 15%;
    border-radius: 5px;
    @media (max-width: 1400px) {
      width: 20%;
      bottom: 5%;
    }
  }
  .phoneIcon {
    position: absolute;
    right: 4%;
    bottom: 8.5%;
    @media (max-width: 1400px) {
      width: 30px;
      bottom: 2%;
    }
  }
  nav {
    @media(max-width: 1100px){
      display: none;
    }
  }
`;

export const Nav = styled(NavLink)`
  .navbar {
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  nav {
  @media (max-width: 1500px) {
      font-size: 13px;
    }
    @media (max-width: 1200) {
      font-size: 11px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }
  .navMenu {
    width: 200px;
    height: 100px;
    background-color: white;
    color: black;
  }
`;




