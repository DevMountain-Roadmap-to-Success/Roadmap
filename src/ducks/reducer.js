import {GET_USER} from './constants'

const initialState = {
    user: {}
};

export default function reducer (state=initialState, action){
    switch(action.type) {
    case GET_USER:
        Object.assign({}, state, {user: action.payload})
        return state
        default: return state;
    }
};

export const getUser = user => ({type: GET_USER, payload: user })