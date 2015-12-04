import React, {Component, PropTypes} from 'react';
import {Input} from 'react-bootstrap';
import FormError from './FormError';

export default class RFBSInput extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    ...Input.propTypes
  }

  render() {
    const {field} = this.props;
    const options = {};

    if (field.touched) {
      if (field.error) {
        options.bsStyle = 'error';
      } else {
        options.bsStyle = 'success';
      }
      options.hasFeedback = true;
    }

    return (
      <div>
        <Input {...this.props} {...field} {...options} />
        <FormError field={field} />
      </div>
    );
  }
}
