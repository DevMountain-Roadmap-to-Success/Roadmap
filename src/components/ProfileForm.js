import React from 'react'
import styled from 'styled-components'
import { ProfileModal } from './Styles'
import Button from './functional/Button'
import Input from './functional/Input'
import pic from '../assets/pic.jpg'
import {StyledInput} from './functional/ElementStyles'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../ducks/reducer'
import {Link} from 'react-router-dom'
const ImageInput = styled(StyledInput)`
    background-image: url(${pic});
    background-size: 9%;
    background-position-y: 4px;
    background-repeat: no-repeat;
    text-indent: 35px;
    outline: none;

`

 const ProfileButton = styled(Button)`
 margin-top: 20px;
    height: 40px;
 `

class ProfileForm extends React.Component {
    state = {
        cohort: '',
        full_name: '',
        image: ''
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps){
            console.log(nextProps)
        }
    }
    submit = () => {
        const {cohort, full_name, image} = this.state
        console.log(cohort, full_name, image)
        if(full_name.length >= 2 && cohort >= 2){
        axios.put(`/api/update/${cohort}`, {full_name, image})
        .then((res) => {
            console.log(res.data)
            if(res.status === 200){
                 this.props.getUser(res.data[0])
                 this.props.history.push('/dashboard')
            }
        })
        } else {
            this.setState({error: "Name and/or Cohort is empty" })
            this.errorTimer()
        }

    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({ [e.target.name ]: e.target.value });
      };
      errorTimer = () => {
       setTimeout(() => {
            this.setState({error: ''})
       }, 3000);
      }
      sendMessage = () => {
          axios.post('/api/message')
          .then((res) => {
              if(res.status === 200){
                  this.props.onClose()
              }
          })
      }
    render(){
        // console.log({...this.props})
        return(
            <ProfileModal {...this.props} height='400px'>
           
           <Link to='/roadmap/login'> <i
              className='	
              glyphicon glyphicon-remove close'
                alt=""
                width="15px"
                height="15px"

              /></Link>
                {/* <StyledForm> */}
                <h1 >Complete Signup</h1>
            <Input
            type='text'
            name='full_name'
            value={this.state.full_name} 
            placeholder='Full Name'
             onChange={(e) => this.handleChange(e)} />
            <Input
            value={this.state.cohort}
            type='number' 
            name='cohort'
            placeholder='Your Cohort Number' onChange={(e) => this.handleChange(e)}  />
          <ImageInput 
          placeholder='Picture URL' 
          onChange={(e) => this.handleChange(e)}
          value={this.state.image}
          name='image'/> 
                  <span style={{color: 'red'}}>{this.state.error}</span>
        <ProfileButton onClick={this.submit} name='Continue'/>

  
            </ProfileModal> 
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(ProfileForm)