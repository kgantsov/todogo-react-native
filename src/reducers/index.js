import { combineReducers } from 'redux';
import {loginReducer} from './login';


const reducersData = {
  loginReducer,
};

const reducers = {};

// this function is just to sort reducers alphabetically in case they are not
Object.keys(reducersData).sort().forEach((reducer) => {
  reducers[reducer] = reducersData[reducer];
});


const combinedReducer = combineReducers(reducers);

// if new login the entire state of the app gets cleaned
const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
