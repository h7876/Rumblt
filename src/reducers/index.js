import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import followingReducer from './following';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  followingState: followingReducer
});

export default rootReducer;
