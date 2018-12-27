import React from 'react'
import styled from 'styled-components'
import Header from './functional/Header';
import Nav from './functional/Nav'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const link = {
    textDecoration: 'none',
    color: 'white',
    marginRight: '5%',

}
class Resources extends React.Component {
    render(){
        const API_KEY = 'AIzaSyAF3jpyne06dNiwd_sdkm0Z-J7IqhEgKls'
        return (
            <div>
                <Header >
                    <Nav justifyContent='flex-end'
                    render={ <>
                     <Link to='/playground' style={link}>CODE PLAYGROUND</Link>
                        {this.props.user ? 
                    <Link to='/dashboard' style={link}>DASHBOARD</Link>
                    :
                        <Link to='/home' style={link}>HOME</Link> }
                    <Link to='/jobprep' style={link}>JOB PREP</Link> </> }/>
                    </Header>
             
            </div>
            )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Resources)