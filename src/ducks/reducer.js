import {GET_USER, GET_TASKS, TOGGLE_MENU} from './constants'

const initialState = {
    user: {},
    task: {},
    open: false
};

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
      return Object.assign({}, state, {user: action.payload})

    case GET_TASKS:
        return Object.assign({}, state, {task: action.payload})
    case TOGGLE_MENU:
        return Object.assign({}, state, {open: action.payload})    
        default: return state;
    }
};

export const getUser = user => ({type: GET_USER, payload: user })
export const getTasks = task => ({type: GET_TASKS, payload: task})
export const toggleMenu = open => ({type: TOGGLE_MENU, payload: !open})                