import React from "react";
import styled from "styled-components";
import Form from "./functional/Form";
import Input from "./functional/Input";
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'





const StyledForm = styled(Form)`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media(max-width: 1100px){
    height: 60%;
  }
`;



 class LoginForm extends React.Component {
  
    render() {


      return (
          <StyledForm validationState={this.props.validate}>
                
                <div className='input-icon'  style={{marginBottom: '20px'}}>
                <i className='glyphicon glyphicon-envelope' width='20px' height='15px' style={{borderRight: 'thin solid #279DFF', color: '#279DFF'}}></i>
                  <Input
                    value={this.props.email}
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={this.props.onChange}
                  /></div>
                  <div className='input-icon'>
                  <i className='glyphicon glyphicon-lock' style={{borderRight: 'thin solid grey', color: 'grey'}}></i>
                  <Input
                    placeholder="Password"
                    type="password"
                    name='password'
                    value={this.props.password}
                    onChange={this.props.onChange}
                  /></div>
         
        </StyledForm>


              )
            }

  };
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {getUser})(LoginForm);
