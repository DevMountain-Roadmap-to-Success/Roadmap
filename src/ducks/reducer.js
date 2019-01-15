import {GET_USER, GET_TASKS, TOGGLE_MENU, GET_POSITION, TOGGLE_ALERT} from './constants'

const initialState = {
    user: {},
    allTasks: [],
    todo: {},
    open: false,
    position: [],
    alert: false,

};
const ADD_TASK = 'ADD_TASK'

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
      return (state, Object.assign({}, state, {user: action.payload}))

    case GET_POSITION:
    return Object.assign({}, state, {position: action.payload})

    case GET_TASKS:
        return (state, Object.assign({}, state, {allTasks: action.payload}))

    case ADD_TASK:
    return (state, Object.assign({}, state, {todo: action.payload}))
    
    case TOGGLE_MENU:
        return Object.assign({}, state, {open: action.payload})  
        
        case TOGGLE_ALERT:
        return Object.assign({}, state, {alert: action.payload}) 
        default: return state;
    }
};
export const addTask = todo => ({type: ADD_TASK, payload: todo})
export const getPosition = (array) => ({type: GET_POSITION, payload: array})
export const getUser = user => ({type: GET_USER, payload: user })
export const getTasks = allTasks => ({type: GET_TASKS, payload: allTasks})
export const toggleMenu = open => ({type: TOGGLE_MENU, payload: !open})             
export const toggleAlert = edit => ({type: TOGGLE_ALERT, payload: !edit})