import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {ButtonInput} from 'react-bootstrap';
import RFBSInput from '../components/RFBSInput';

const constraints = {
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  password: {
    presence: true
  }
}

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: (data, props) => validate(data, constraints) || {}
})
export default class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {

    const {
      fields: {
        email,
        password
      },
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div>
        <form>
          <RFBSInput type="text" label="Email Address" field={email} />
          <RFBSInput type="password" label="Password" field={password} />
          <ButtonInput type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid} />
        </form>
      </div>
    );
  }
}
