import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import jobReducer from './jobReducer';
import postReducer from './postReducer';
import questionReducer from './questionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  job: jobReducer,
  post: postReducer,
  question: questionReducer
});
