import React, {Component, PropTypes} from 'react';

export default class LogoutButton extends Component {

  static propTypes = {
    onLogout: PropTypes.func.isRequired
  }

  render() {
    return (
      <a
        href="/logout"
        onClick={this.props.onLogout}>
        Logout <i className='fa fa-sign-out' />
      </a>
    );
  }
}
