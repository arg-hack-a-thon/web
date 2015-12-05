import React, {Component} from 'react';
import styles from './Player.less';

export default class Player extends Component {

	constructor(props) {
		super(props);

		this.state = {
			videoSrc: 'only noise'
		}
	}

  render() {
    return (
	    <div className="embed-responsive embed-responsive-16by9">
			  <img className="embed-responsive-item" src={this.state.videoSrc}></img>
			</div>
  	)
  }
}
