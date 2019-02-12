import {GET_USER, GET_TASKS, TOGGLE_MENU, GET_POSITION, TOGGLE_ALERT, ADD_TASK, ADD_TODO} from './constants'


const initialState = {
    user: {},
    allTasks: [],
    todo: {},
    open: false,
    position: [],
    alert: false,
    text: ''

};

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
      return ( Object.assign({}, state, {user: action.payload}))

    case GET_POSITION:
    return Object.assign({}, state, {position: action.payload})

    case GET_TASKS:
        return (state, Object.assign({}, state, {allTasks: action.payload}))

    case ADD_TASK:
    return (state, Object.assign({}, state, {todo: action.payload}))
    
    case ADD_TODO:
    Object.assign({}, state, {text: action.payload})
    return state

    case TOGGLE_MENU:
        return Object.assign({}, state, {open: action.payload})  
        
        case TOGGLE_ALERT:
        return Object.assign({}, state, {alert: action.payload}) 
        default: return state;
    }
};

export const getUser = user => ({type: GET_USER, payload: user })
export const addTask = todo => ({type: ADD_TASK, payload: todo})
export const getPosition = (array) => ({type: GET_POSITION, payload: array})
export const getTasks = allTasks => ({type: GET_TASKS, payload: allTasks})
export const toggleMenu = open => ({type: TOGGLE_MENU, payload: !open})             
export const toggleAlert = edit => ({type: TOGGLE_ALERT, payload: !edit})
export const addTodo = text => ({type: ADD_TODO, payload: text})