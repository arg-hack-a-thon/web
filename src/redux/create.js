import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import DevTools from './components/DevTools';

export default function configureStore(initialState) {
  let finalCreateStore;

  if (process.env.NODE_ENV === "production") {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      reduxReactRouter({ createHistory })
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      reduxReactRouter({ createHistory }),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )(createStore);
  }

  const reducers = require('./reducers');
  const store = finalCreateStore(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
