import memoize from 'memoize-one'
import {connect} from 'react-redux'


// const userInfo = user => user


const filterTasks = memoize(tasks => tasks.filter(todo => { 
    const {id} = this.props
    if(todo.task_id === id) return todo  
}))


const mapStateToProps = state => {
    const {allTasks} = state
    return { allTasks }
}

export default connect(mapStateToProps)(filterTasks)
