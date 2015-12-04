import React, {Component, PropTypes} from 'react';

export default class LoginButton extends Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  render() {
    return <a href="/login" onClick={this.props.onLogin}>Login</a>;
  }
}
