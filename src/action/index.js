// Actions
export const ACTION_TYPE = 'EXAMPLE';
export const OUTPUT_TEXT = 'OUTPUT_TEXT';
export const THUNK_ACTION = 'THUNK_ACTION';

// Action creators
export function action(payload){
    return {
        type: ACTION_TYPE,
        payload
    }
}

export function outPutText(payload){
    return {
        type: OUTPUT_TEXT,
        payload
    }
}

// Action thunk
export function thunkAction(){
  return {
    type: THUNK_ACTION
  }
}

// Example of redux-thunk
// Redux thunk is just an action creator that gives us the possibility
// to return a function instead of an object
export function thunkActionCreator(payload){
  return function(dispatch, getState){
    const expression = true;
    if(!expression){
      return;
    }

    dispatch(thunkAction())
  }
};
