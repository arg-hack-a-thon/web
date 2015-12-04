import { routerStateReducer } from 'redux-router';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './modules/user';
import layout from './modules/layout';

export default combineReducers({
  router: routerStateReducer,
  form: formReducer,
  user, layout
});
