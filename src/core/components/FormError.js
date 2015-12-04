import React, {Component, PropTypes} from 'react';

export default class FormError extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired
  }

  render() {

    const {field} = this.props;
    let component = null;

    if (field.error && field.touched) {
      component = (
        <ul>
          { field.error.map( (err, i) => <li key={i}>{err}</li> ) }
        </ul>
      )
    }

    return component;
  }
}
