import Immutable from 'immutable';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  sidebarToggled: false
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  SIDEBAR_TOGGLE: "SIDEBAR_TOGGLE"
}

/**
 * Public: Action Creators
 */

export function toggleSidebar() {
  return {
    type: actionTypes.SIDEBAR_TOGGLE
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case actionTypes.SIDEBAR_TOGGLE:
      return state.set('sidebarToggled', !state.get('sidebarToggled'));

    default:
      return state;
  }

}
