/**
 * Combine all reducers here.
 * Maybe each container can contain different reducer(?)
 */

import { combineReducers } from 'redux';
import Tasks from './Tasks';

const appReducer = combineReducers({
  Tasks
});

const rootReducer = (state, action) => {

  return appReducer(state, action);
};
export default rootReducer;
