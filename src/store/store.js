import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Single source of truth, store that holds all state
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
