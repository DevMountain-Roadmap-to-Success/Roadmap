import React from 'react'
import styled from 'styled-components'
import { ProfileModal } from '../Styles'
import Button from '../functional/Button'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import SweetAlert from 'react-bootstrap-sweetalert'

const Textarea = styled.textarea`
    height: 50%;
    width: 80%;
`

class Message extends React.Component {
    state = {
        message: '',
        alert: false
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
          const {friend_email, friend_id} = this.props
          const {message} = this.state
          axios.post('/api/message', {friend_email, friend_id, message})
          .then((res) => {
              if(res.status === 200){
                 return this.setState({alert: true})
            }
        })
      }
      showAlert = () => {
          if(this.state.alert){
              return (
                <SweetAlert 
                success 
                title="Woot!" 
                onConfirm={this.props.onClose} 
           > 
           Message Sent
            </SweetAlert>
              )
          }
      }
    render(){
        console.log(this.props)
        return(
            <ProfileModal {...this.props} height='400px'>
                <i
                onClick={this.props.onClose}
               className='	
              glyphicon glyphicon-remove close'
                alt=""
                width="15px"
                height="15px"

              />
              {this.showAlert()}
                <h3 style={{fontSize: '20px', textAlign: 'left'}}>To: {this.props.friend_name}</h3>
                <Textarea name='message' onChange={this.handleChange}/>

                <Button style={{margin: '3%'}}name='Send Message' onClick={this.sendMessage}/>
           <span> {this.state.confirm}</span>
            </ProfileModal> 
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Message)