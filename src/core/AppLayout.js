import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/modules/user';
import { toggleSidebar } from '../redux/modules/layout';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import SiteLogo from './components/SiteLogo';
import MainNav from './components/MainNav';
import Toolbar from './components/Toolbar';
import styles from './AppLayout.less';
import cx from 'classnames';

@connect(
  state => ({
    user: state.user,
    layout: state.layout
  }),
  dispatch => bindActionCreators({
    logoutUser,
    toggleSidebar
  }, dispatch)
)
export default class AppLayout extends Component {

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleToggle(e) {
    this.props.toggleSidebar();
  }

  render() {

    const lwClasses = {
      [styles.toggled]: this.props.layout.get('sidebarToggled')
    };

    return (
      <div className={cx(styles.layoutWrapper, lwClasses)}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.sidebar}>
            <SiteLogo />
            <MainNav />
          </div>
        </div>
        <div className={styles.pageContentWrapper}>
          <div className={styles.pageContent}>
            <Grid fluid>
              <Toolbar
                user={this.props.user}
                onLogout={this.handleLogout.bind(this)}
                onToggle={this.handleToggle.bind(this)}
              />
              <Row>
                <Col xs={12}>
                  {this.props.children}
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
