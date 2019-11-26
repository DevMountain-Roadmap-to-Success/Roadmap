import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import {connect} from 'react-redux'
import {toggleAlert} from '../../ducks/reducer'

const Alert = ({title, children}) => (
        <SweetAlert title={title} onConfirm={props.toggleAlert}>
                <p>{children}</p>
       </SweetAlert>
    )
    
const mapStateToProps = state => {
    return { alert: state.alert }
}

export default connect(mapStateToProps, {toggleAlert})(Alert)
