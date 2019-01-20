import React from 'react'
import axios from 'axios';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import Input from '../functional/Input'
import Button from '../functional/Button'
import Header from '../Header'
import styled from 'styled-components'
import SweetAlert from 'react-bootstrap-sweetalert'
import {MenuButton} from '../widgets/Flashcard'
import {Box, ProfileModal, Profile, PictureBox} from '../Styles'
import icon from '../../assets/edit.png'
import defaultPic from '../../assets/person.png'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import memoizeOne from 'memoize-one'



const PasswordButton = styled.button`
    background-color: transparent;
    outline-color: transparent;
    outline: none;
    height: 30px;
    width: 170px;
    margin-top: 20px;
    border: none;

    background-image: url(${icon});
    background-size: 20%;
    background-repeat: no-repeat;

`
const StyledInput = styled(Input)`
  width: ${props => props.width || "80%"};
  height: ${props => props.height || "40px"};
  font-size: ${props => props.fontSize || "18px"};
  margin: ${props => props.margin};
`;


class EditProfile extends React.Component {
  
    state = {
    alert: false,
    warningAlert: false,
    email: localStorage.getItem('email'),
    newPassword: '',
    oldPassword: '',
    showValidation: false,
    changePassword: false,
    successAlert: false,
    showInputs: false,
    confirmPassword: '',
    image: '',
    userImage: false,
    input: '',
    _isMounted: false,
    full_name: ''

}    
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps, this.props)
    }

validatePasswords = () => {
    if(this.state.newPassword === this.state.confirmPassword){
        return this.state.newPassword
    }
        axios.put('/auth/password', {password: this.state.newPassword})
        .then((res) => {
            if(res.status === 200){

                this.props.getUser(res.data)
            }
            return this.toggleValidation()       
        })
}

toggleValidation = () => {
    this.setState(prevState => {
        return { showValidation: !prevState.showValidation}
    })
}
toggleAlert = () => {
    this.setState({successAlert: !this.state.successAlert})
  }
  toggleInputs = () => {
    this.setState(prevState => { return { showInput: !prevState.showInput}})
}


    updateImage = (image) => {
        axios.post('/api/update', { image } )
        .then((res) => {
            if(res.status === 200){
                console.log(res.data)
                this.setState({userImage: true, image: res.data[0].image})
                return this.props.getUser(res.data[0])
        
            } else {
                return this.setState({error: 'Something Went Wrong'})
            }
        })
    }

    checkPassword = () => {
        const {email} = this.state
        const password = this.state.oldPassword
        axios.post('/auth/login', { email, password})
        .then((res) => {
            if(res.status === 200){
             this.setState({showInputs: true})
             return this.props.getUser(res.data)

            }
        })
        return this.toggleAlert()
    }
   

    handleChange = (value) => {
        this.setState({ input: value, image: value })
        return this.updateImage(value)
    }

 
    showAlert = () => {
    if(this.state.warningAlert) {
    return (
        <SweetAlert success title="Update Successful!" onConfirm={this.toggleAlert('success')}>
  
        </SweetAlert>
    )
    } else if(this.state.successAlert){
        return (
          <SweetAlert success title="Good job!" onConfirm={this.toggleAlert}>
          Password Validated!
      </SweetAlert>
  
        )
    } else if(this.state.alert){
        return (
          <SweetAlert 
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={this.deleteAccout}
          onCancel={this.toggleAlert}
      >
          You will not be able to recover your account
      </SweetAlert>
        )
    } else {
      return null
    }
  }
  
      showPasswordInputs = () => {
          if(this.state.showValidation){
              return !this.state.showInputs ? (
                  <ProfileModal id='modal-root'>
                    <header>Please validated your current password</header>

                  <i
              className='	
              glyphicon glyphicon-remove close'
                alt=""
                width="15px"
                height="15px"
                  onClick={this.toggleValidation}
              />
                  <StyledInput 
                  name='oldPassword' 
                  onChange={this.handleChange}
                  value={this.state.oldPassword}/>
                 <Button name='Submit' onClick={this.checkPassword}/>
          </ProfileModal>
            ) : (
                <ProfileModal id='modal-root'>
                    <StyledInput 
          name='newPassword' 
          placeholder = 'New Password'
              value={this.state.newPassword}
          onChange={this.handleChange}/>
          <StyledInput
          value={this.state.confirmPassword}
          placeholder='Confirm Password' 
          name='confirmPassword' 
          onChange={this.handleChange}/>
          <div className='buttons'>
          <MenuButton onClick={this.toggleValidation} name='Cancel'/>
          <MenuButton onClick={this.validatePasswords} name='Submit'/>
          </div>
            
              </ProfileModal> 
              )
          } 
  }
   
    render(){
console.log(this.props.image)

    return (
<div>
         <Header/>
        <Profile>

            <Box  {...this.props}>
       <Link to='/dashboard'> <button className='back'>{`<< Go Back`}</button></Link>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <PictureBox>
            <img src={this.props.user.image} />
         
         
         </PictureBox>
         { this.state.userImage ? (
            //  <>
           
               <MenuButton onClick={() => this.setState({userImage:!this.state.userImage})} name='Edit Picture'/>
         ) : (
         <input
         style={{width: '100%', height: '25px', marginTop: '5px'}}
         placeholder='Image Url' 
         value={this.state.input}
         onChange={(e) => this.handleChange(e.target.value)}
         />
         )}
         </div>
       <span> <h1>{`${this.props.user.full_name}`}
       </h1>
       <PasswordButton onClick={this.toggleValidation}>Edit Password</PasswordButton></span>
         </Box>  
         <div>
         </div> 
                {this.showPasswordInputs()}
                {this.showAlert()}        

            </Profile>
            </div>
    )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        // full_name: (state.user),
        // image: getName(state.user)
    }
}

export default withRouter(connect(mapStateToProps, {getUser})(EditProfile))