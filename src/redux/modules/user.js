import Immutable from 'immutable';
import cookie from 'component-cookie';
import API from '../../lib/Api';
import { HTTPError } from '../../lib/errors';
import { pushState, replaceState } from 'redux-router';

// console.log('Cookie: Token', cookie('token'));

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  isLoggedIn: cookie('token') ? true : false,
  token: cookie('token') ? cookie('token') : null,
  redirectTo: null,
  redirectOnLogin: false,
  data: {},
  err: {},
  isError: false,
  isUnauthorized: false
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_COMPLETE: 'USER_LOGIN_COMPLETE',
  USER_LOGIN_UNAUTHORIZED: 'USER_LOGIN_UNAUTHORIZED',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',

  USER_FETCH_REQUEST: 'USER_FETCH_REQUEST',
  USER_FETCH_COMPLETE: 'USER_FETCH_COMPLETE',
  USER_FETCH_ERROR: 'USER_FETCH_ERROR',

  USER_LOGOUT: 'USER_LOGOUT',

  USER_FORCE_LOGIN: 'USER_FORCE_LOGIN',

  USER_CLEAR_REDIRECT: 'USER_CLEAR_REDIRECT'
}

/**
 * Public: Action Creators
 */

export function loginUser(email, password) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST
    })
    return API.loginUser(email, password)
      .then(loggedInUser => {
        return dispatch({
          type: actionTypes.USER_LOGIN_COMPLETE,
          loggedInUser
        })
      })
      .catch(err => {
        switch (err.name) {
          case 'HTTPError':
            return dispatch(processHTTPErrors(err));
          default:
            return dispatch({
              type: actionTypes.USER_LOGIN_ERROR,
              err
            })
        }
      })
  }
}

export function fetchUser() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.USER_FETCH_REQUEST
    })
    return API.fetchUser(getState().user.get('token'))
      .then(userData => {
        return dispatch({
          type: actionTypes.USER_FETCH_COMPLETE,
          userData
        })
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: actionTypes.USER_FETCH_ERROR,
          err
        })
      })
  }
}

export function logoutUser() {
  return {
    type: actionTypes.USER_LOGOUT
  }
}

export function forceLogin(pathname, query) {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.USER_FORCE_LOGIN,
      pathname,
      query
    })

    return dispatch(replaceState(null, '/'));
  }
}

export function redirectLoggedInUser() {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.get('redirectOnLogin')) {
      const redirect = user.get('redirect')
      dispatch({
        type: actionTypes.USER_CLEAR_REDIRECT
      })

      return dispatch(
        replaceState(
          null,
          redirect.get('pathname'),
          redirect.get('query').toJS()
        )
      );
    } else {
      return dispatch(
        replaceState(null, '/dashboard')
      );
    }
  }
}

/**
 * Private: Action Creators
 */

function processHTTPErrors(err) {
  switch (err.errorCode) {
    case 401:
      return {
        type: actionTypes.USER_LOGIN_UNAUTHORIZED,
        err
      }

    default:
      return {
        type: actionTypes.USER_LOGIN_ERROR,
        err
      }
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case actionTypes.USER_LOGIN_COMPLETE:
      const {loggedInUser} = action;
      cookie('token', loggedInUser.token, { path: '/', maxage: 1000*60*60*24 });
      return state.merge({
        isLoggedIn: true,
        token: loggedInUser.token,
        data: loggedInUser,
        err: {},
        isError: false,
        isUnauthorized: false
      });

    case actionTypes.USER_LOGIN_UNAUTHORIZED:
      cookie('token', null);
      return state.merge({
        isLoggedIn: false,
        token: null,
        data: {},
        err: action.err,
        isError: false,
        isUnauthorized: true,
        redirectOnLogin: false,
        redirect: undefined
      });

    case actionTypes.USER_LOGIN_ERROR:
      cookie('token', null);
      return state.merge({
        isLoggedIn: false,
        token: null,
        data: {},
        err: action.err,
        isError: true,
        isUnauthorized: false,
        redirectOnLogin: false,
        redirect: undefined
      });

    case actionTypes.USER_FETCH_COMPLETE:
      return state.merge({
        data: action.userData
      })

    case actionTypes.USER_LOGOUT:
      cookie('token', null);
      return state.merge({
        isLoggedIn: false,
        token: null,
        data: {},
        err: {},
        isError: false,
        isUnauthorized: false,
        redirectOnLogin: false,
        redirect: undefined
      });

    case actionTypes.USER_FORCE_LOGIN:
      cookie('token', null);
      return state.merge({
        isLoggedIn: false,
        token: null,
        data: {},
        err: {},
        isError: false,
        isUnauthorized: false,
        redirectOnLogin: true,
        redirect: {
          pathname: action.pathname,
          query: action.query
        }
      });

    case actionTypes.USER_CLEAR_REDIRECT:
      return state.merge({
        redirectOnLogin: false,
        redirect: undefined
      })

    default:
      return state;
  }

}
