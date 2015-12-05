import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import styles from './OpenDoorButton.less';

export default class OpenDoorButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			doorState: 'closed'
		}
	}

	onOpenDoor = function(){
		this.setState( function( state ) {

      state.doorState = (state.doorState == 'closed') ? 'opened' : 'closed';

      return { doorState: state.doorState };

    });
		console.log('click')
	}

  render() {
    return (
	    <div>
	    	<Button className={styles.btn} onClick={this.onOpenDoor.bind(this)}>Open Door</Button>
	  		<span>{this.state.doorState}</span>
	  	</div>
  	)
  }
}
