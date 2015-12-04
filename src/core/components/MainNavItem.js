import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './MainNavItem.less';

export default class MainNavItem extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string
  }

  render() {
    let icon;

    if (this.props.icon) {
      icon = <i className={`fa fa-${this.props.icon}`} />
    }

    return (
      <li className={styles.itemWrapper}>
        <Link
          to={this.props.to}
          activeClassName={styles.active}
          className={styles.item}>
            {icon}
            {this.props.children}
        </Link>
      </li>
    );
  }
}
