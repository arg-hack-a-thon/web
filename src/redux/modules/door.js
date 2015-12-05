import Immutable from 'immutable';
import Api from '../../lib/Api';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  isOpen: false
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  OPEN_DOOR_REQUEST: 'OPEN_DOOR_REQUEST',
  OPEN_DOOR_SUCCESS: 'OPEN_DOOR_SUCCESS',
  OPEN_DOOR_FAILED: 'OPEN_DOOR_FAILED',
}

/**
 * Public: Action Creators
 */

export function openDoor() {
  return (dispatch, getState) => {

    const { user } = getState();

    dispatch({
      type: actionTypes.OPEN_DOOR_REQUEST
    })

    return Api.openDoor(user.get('token'))
      .then(responseData => {
        return dispatch({
          type: actionTypes.OPEN_DOOR_SUCCESS
        })
      })
      .catch(err => {
        return dispatch({
          type: actionTypes.OPEN_DOOR_FAILED
        })
      })
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    // Action reducers here

    default:
      return state;
  }

}
