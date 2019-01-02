import styled from 'styled-components'
import NavLink from './functional/Nav'
import background from '../assets/background.jpg'

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



export const Wrapper = styled.div`
  background-color: white;
  width: 330px;
  height: 350px;
  display: flex;
  box-shadow: 0px 1px 1px 0.5px rgb(200, 200, 200);
  justify-content: center;
  flex-direction: "column";

  button {
    background-color: transparent;
    border: none;
  }
`;
export const TodoForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin-top: 5%;
  font-family: "Nunito";
  overflow: scroll;

  input {
    border: none;
    background-color: transparent;
  }
`;

