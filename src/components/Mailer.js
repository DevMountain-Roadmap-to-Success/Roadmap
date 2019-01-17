import React from 'react'
import axios from 'axios'


class Mailer extends React.Component {
    state = {sendMail: false, timerId: setInterval(this.timer, 1000)}

    componentDidMount = () => {
        axios.post('/sendEmail')
        .then((res) => {
            console.log(res.data)
        })
    }
   
    render(){
        return (
            <div>hi</div>
        )
    }
}
export default Mailer