import React, {Component} from 'react';
import MainNavItem from './MainNavItem';
import styles from './MainNav.less';

export default class MainNav extends Component {
  render() {
    return (
      <ul className={styles.wrapper}>
        <MainNavItem to='/dashboard' icon='th-large'>Dashboard</MainNavItem>
      </ul>
    );
  }
}
