import {GET_USER, GET_TASKS, TOGGLE_MENU, GET_POSITION} from './constants'

const initialState = {
    user: {},
    task: {},
    open: false,
    position: {}
};

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
      return (state, Object.assign({}, state, {user: action.payload}))

    case GET_POSITION:
    return Object.assign({}, state, {position: action.payload})

    case GET_TASKS:
        return Object.assign({}, state, {task: action.payload})
    case TOGGLE_MENU:
        return Object.assign({}, state, {open: action.payload})    
        default: return state;
    }
};

export const getPosition = position => ({type: GET_POSITION, payload: position})
export const getUser = user => ({type: GET_USER, payload: user })
export const getTasks = task => ({type: GET_TASKS, payload: task})
export const toggleMenu = open => ({type: TOGGLE_MENU, payload: !open})                