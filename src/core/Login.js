import React, {Component} from 'react';
import { connect } from 'react-redux';
import { replaceState, pushState } from 'redux-router';
import { loginUser, redirectLoggedInUser } from '../redux/modules/user';
import LoginForm from './forms/LoginForm';
import styles from './Login.less';

@connect(
  state => ({user: state.user}),
  { replaceState, loginUser, redirectLoggedInUser }
)
export default class Login extends Component {

  componentWillMount() {
    if (this.props.user.get('isLoggedIn')) {
      this.props.redirectLoggedInUser();
    }
  }

  handleSubmit(formData) {
    this.props.loginUser(formData.email, formData.password);
  }

  render() {
    const {user} = this.props;
    let errors = [];

    if (user.get('isError')) {
      errors.push(
        <div
          key='error'
          className='alert alert-danger'
          role='alert'>
          There was a problem authenticating. Please contact admin.
        </div>
      )
    }

    if (user.get('isUnauthorized')) {
      errors.push(
        <div
          key='auth'
          className='alert alert-danger'
          role='alert'>
          There was a problem with your credentials
        </div>
      )
    }

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginModule}>
          <h1>Login</h1>
          {errors}
          <LoginForm onSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}
