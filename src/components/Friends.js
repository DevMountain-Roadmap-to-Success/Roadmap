import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './functional/Button';
import {PictureBox} from './Styles'
import pic from '../assets/person.png'
import Input from './functional/Input'
import Header from './Header';
import search from '../assets/search.png'
import Message from './Message';



const SearchInput = styled(Input)`
    width: 30%;
    background-image: url(${search});
    background-repeat: no-repeat;
    background-size: 25px;
    text-indent: 30px;
    background-position-y: 5px;
    border-radius: 2px;
    margin: 3%;
    border: thin solid lightgrey;

`

const FriendContainer = styled.section`
    width: 80%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 5%;

    h1 {
        font-size: 36px;
        font-weight: bold;

    }
`
const Card = styled.div`
     width: 350px;
    height: 200px;
    margin: 20px;
    border-color: #FF9160;
    border-style: solid;
    margin-left: 10px;
    display: flex;
    box-shadow: 1px 1px 1px 1px rgb(210, 210, 220);
    .rightbox {
        display: flex;
        flex-direction: column;
        width: 60%;
        align-items: center;
        justify-content: center;
    }
    span {
        text-align: center;
        font-weight: bold;
        font-size: 26px;
    }
`
const AddButton = styled(Button)`
height: 35px;
width: 100px;
border-radius: 1px;
border: solid thin lightgray;
background-color: transparent;
box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.2);
font-weight: bold;
color: gray;
margin-right: 3%;
margin-top: 10px;
font-size: 14px;
   `
   class Friends extends React.Component {
       state = {
           input: '',
           friend_name: '',
           suggestedFriends: [],
           allFriends: [],
           showMessageBox: false
       }


    componentDidMount() {
                axios.get(`/api/findFriends`)
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ friends: res.data })
                    },
                    axios.get('/api/everyone')
                        .then((res) => {
                            console.log(res.data)
                            this.setState({allFriends: res.data})
                        })
                    )

    }
       showFriends() {
           let friends = this.state.friends
           let user_id = this.state.user_id
           let friend = []
           if (this.state.friends && this.state.friends.length > 0) {
               for (let i in friends) {
                   friend.push(
            
                       <Card key={friends[i].user_id}>
                                <PictureBox borderRadius='50%' shadow='none' height='180px' width='200px'>
                                    {friends[i].image !== null ?
                                        <img src={friends[i].image} width='100%' height='100%' alt='' />
                                        : <img src={pic} alt='none' width='100%' height='100%'  />}
                                </PictureBox>  
                                <div className='rightbox'>
                                <span>{friends[i].full_name}</span>                      

                                  <AddButton onClick={() => this.toggleMessage(friends[i].user_id, friends[i].email, friends[i].full_name)} name='Message'/>
                             </div>
                    </Card>
                )
            }
            
        }
        
        return friend
    }
    toggleMessage = (id, email, name) => {
        console.log(id, email)
        this.setState(prevState => {
            return { showMessageBox: !prevState.showMessageBox,
                    id: id, 
                    email: email,
                    friend_name: name}
        })
    }
    showMessage = () => {
        const {id, email, friend_name} = this.state
        console.log(this.state.id, this.state.email)
        if(this.state.showMessageBox){
            return (
                <Message friend_id={id} friend_email={email} friend_name={friend_name}onClose={this.toggleMessage}>
                    </Message>
            )
        }
    }
    
    
    addFriend(friend_id) {
        console.log(friend_id)
        axios.post(`/api/addfriend/${friend_id}`)
        .then((res) => {
            if (res.status === 200) {
                alert(`${this.state.full_name} you successfully added a new friend`)
            }
            
            return this.componentDidMount()
        })
    }

    handleSort(e){
        this.setState({[e.target.name]: e.target.value },
            () => {
                let friends = this.state.allFriends
                let compare = (a, b) => {
                    const nameA = a[this.state.input]
                    const nameB = b[this.state.input]
                    console.log(nameA, nameB)
                    
                    if(nameA < nameB ){
                        return -1
                    }
                    if(nameA > nameB){
                        return 1
                    } 
                }
                if(this.state.input){
                    console.log(this.state.input)
                    let sortedFriends = friends.sort(compare)
                    this.setState({sortedFriends})
                } else {
                    this.setState({sortedFriends: []})
                }
            })
            
        }
                render(){
                  
                    
                    return (
                        <>
                        <Header />
                        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', paddingTop: '3%'}}>
                            {/* <StyledInput 
                            placeholder='Search...'
                            value={this.state.input}
                            name='input'
                            onChange={(e) => this.handleSort(e)}/> */}
                            <h1 style={{fontWeight: 'bold', fontSize: '36px', marginLeft: '3%'}}>People You May Know</h1>
                        <FriendContainer>
                    
                     {this.showFriends() }

                    </FriendContainer>
                    {this.showMessage()}
                    </div>
                    </>
        )
    }
}
    
    export default Friends