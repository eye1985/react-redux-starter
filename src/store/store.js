import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

// Single source of truth, store that holds all state
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
