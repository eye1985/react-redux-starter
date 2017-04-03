import { combineReducers } from 'redux';
import {ACTION_TYPE, action} from '../action/action';


const initState = {
    message: `Hello there!`
};

function reducerOne(state = {message:'hello world'},action){
    switch(action.type){
        case ACTION_TYPE:
            return state
        default:
            return state
    }
}

export default combineReducers({
    reducerOne
});
