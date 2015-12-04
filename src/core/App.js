import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { redirectLoggedInUser, forceLogin } from '../redux/modules/user';
import DevTools from '../redux/components/DevTools';

@connect(
  state => ({
    user: state.user,
    router: state.router
  }),
  { replaceState, redirectLoggedInUser, forceLogin }
)
export default class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.user.get('isLoggedIn') && !nextProps.user.get('isLoggedIn')) {
      const { router: location } = this.props;
      this.props.forceLogin(location.pathname, location.query);
    }
    else if (!this.props.user.get('isLoggedIn') && nextProps.user.get('isLoggedIn')) {
      this.props.redirectLoggedInUser();
    }
  }

  render() {
    let _DevTools;
    if (process.env.NODE_ENV === "development"
        && process.env.REDUX_DEV_TOOLS) {
          _DevTools = <DevTools />;
    }
    return (
      <div id="app_container">
        {this.props.children}
        {_DevTools}
      </div>
    );
  }
}
