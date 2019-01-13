import React from "react";
import {StyledInput} from './ElementStyles'


const Input = (props ) => {

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
