import {GET_USER, GET_TASKS} from './constants'

const initialState = {
    user: {},
    task: {}
};

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
        Object.assign({}, state, {user: action.payload})
        return state
    case GET_TASKS:
        Object.assign({}, state, {task: action.payload})
        return state
        default: return state;
    }
};

export const getUser = user => ({type: GET_USER, payload: user })
export const getTasks = task => ({type: GET_TASKS, payload: task})                