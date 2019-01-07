import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${props => props.width || "80%"};
  height: ${props => props.height || "40px"};
  font-size: ${props => props.fontSize || "18px"};
  margin: ${props => props.margin};
`;

const Input = (props ) => {
  console.log(props);
  return (
    <StyledInput
      {...props}
      placeholder={props.placeholder}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
    />
  );
};
export default Input;
