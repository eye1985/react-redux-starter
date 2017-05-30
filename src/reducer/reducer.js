import {
  ACTION_TYPE,
  OUTPUT_TEXT,
  THUNK_ACTION
} from '../action';

export function reducerOne(state = {message:'hello world'}, action){
    switch(action.type){
        case ACTION_TYPE:
            return {...state, message: action.payload};
        default:
            return state;
    }
}

export function reducerTwo(state = {message:'I love cake'}, action){
    switch(action.type){
        case OUTPUT_TEXT:
            return {...state, message: action.payload};
        case THUNK_ACTION:
            return {...state, message: 'Thunk action called'};
        default:
            return state;
    }
}
