import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import styles from './OpenDoorButton.less';
import { connect } from 'react-redux';
import { openDoor } from '../../redux/modules/door';

@connect(
	state => ({door: state.door}),
	{ openDoor }
)
export default class OpenDoorButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			doorState: 'closed'
		}
	}

	onOpenDoor = function(){

		this.props.openDoor();

		// this.setState( function( state ) {
		//
    //   state.doorState = (state.doorState == 'closed') ? 'opened' : 'closed';
		//
    //   return { doorState: state.doorState };
		//
    // });
	}

  render() {
    return (
	    <div>
	    	<Button className={styles.btn} onClick={this.onOpenDoor.bind(this)}>Open Door</Button>
	  		{/*<span>{this.state.doorState}</span>*/}
	  	</div>
  	)
  }
}
