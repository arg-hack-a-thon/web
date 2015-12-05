import React, {Component} from 'react';
import MainNavItem from './MainNavItem';
import styles from './MainNav.less';

export default class MainNav extends Component {
  render() {
    return (
      <ul className={styles.wrapper}>
        <MainNavItem to='/door-monitor' icon='th-large'>Door Monitor</MainNavItem>
        <MainNavItem to='/users' icon='user'>Users</MainNavItem>
      </ul>
    );
  }
}
