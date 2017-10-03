import { combineReducers } from 'redux';

import { loginReducer } from './login';
import { todosReducer } from './todo_lists';
import nav from './navigation';


const reducersData = {
  nav,
  loginReducer,
  todosReducer,
};

const reducers = {};

// this function is just to sort reducers alphabetically in case they are not
Object.keys(reducersData).sort().forEach((reducer) => {
  reducers[reducer] = reducersData[reducer];
});


const combinedReducer = combineReducers(reducers);

// if new login the entire state of the app gets cleaned
const rootReducer = (state, action) => combinedReducer(state, action);

export default rootReducer;
