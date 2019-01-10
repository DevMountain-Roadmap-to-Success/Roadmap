import styled from 'styled-components'

//Dropdown
export const Menu = styled.menu`
    background-color: white;
    padding: 20px;
    width: 140px;
    position: absolute;
    z-index: 100;
    top: ${props => props.top || "60px"};
    right: ${props => props.right || "3%"};
    color: black;
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgb(135, 135, 165);

    li {
     list-style: none;
     text-align: left;
     line-height: 30px;
    }
`

//Button
export const StyledButton = styled.button`
background-color:${props => props.backgroundColor || '#00AAE8'};
color: white;
width: 170px;
height: 40px;
font-size: 15px;
font-weight: 600;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
border: ${props => props.border || 'none' };
border-radius: 3px;

@media(max-width: 1300px){
    width: 140px;
    height: 35px;
    font-size: 13px;
}
`


//Input
export const StyledInput = styled.input`
  width: ${props => props.width || "80%"};
  height: ${props => props.height || "40px"};
  font-size: ${props => props.fontSize || "18px"};
  margin: ${props => props.margin};
`;

//Form
export const Form = styled.form`
width: 100%;
height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
