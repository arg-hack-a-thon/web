import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import configureStore from './redux/create';
import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';

require('font-awesome/css/font-awesome.css');
require('bootstrap/dist/css/bootstrap.css');
require('./global.less');

// Load our custom validators
require('./lib/validators');

const store = configureStore();

const routes = {
  path: '/',
  component: require('./core/App'),
  indexRoute: {
    component: require('./core/Login')
  },
  childRoutes: [{
    component: require('./core/LoginRequired'),
    childRoutes: [{
      component: require('./core/AppLayout'),
      childRoutes: [
        ...require('./dashboard')
      ]
    }]
  }]
}

class CloudzAdmin extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxRouter routes={routes} />
      </Provider>
    );
  }
};

ReactDOM.render(<CloudzAdmin />, document.getElementById('root'));