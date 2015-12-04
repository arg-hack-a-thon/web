import React, {Component} from 'react';
import { connect } from 'react-redux';
import { replaceState, pushState } from 'redux-router';
import { fetchUser, forceLogin } from '../redux/modules/user';

@connect(
  state => ({
    user: state.user,
    router: state.router
  }),
  { replaceState, fetchUser, forceLogin }
)
export default class LoginRequired extends Component {

  componentWillMount() {
    if (!this.props.user.get('isLoggedIn')) {
      const { router: { location } } = this.props;
      this.props.forceLogin(location.pathname, location.query);
    }
    else if (this.props.user.get('data').size === 0) {
      this.props.fetchUser();
    }
  }

  render() {
    if (this.props.user.get('data').size === 0) {
      return null;
    } else {
      return this.props.children;
    }
  }
}
