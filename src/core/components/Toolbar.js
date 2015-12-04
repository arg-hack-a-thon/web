import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import styles from './Toolbar.less';

export default class Toolbar extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
  }

  render() {
    return (
      <Row>
        <Col xs={12} className={styles.container}>

          <div className={styles.leftContainer}>
            <button onClick={this.props.onToggle}><i className="fa fa-bars" /></button>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.item}>
              <p>Hello, {this.props.user.get('data').get('firstName')}</p>
            </div>
            <div className={styles.item}>
              {(this.props.user.get('isLoggedIn')) ?
                <LogoutButton onLogout={this.props.onLogout} /> : null }
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
