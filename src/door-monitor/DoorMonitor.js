import React, {Component} from 'react';
import OpenDoorButton from './components/OpenDoorButton';
import Player from './components/Player';

export default class DoorMonitor extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Door Monitor</h1>
        <div className='row'>
        	<div className='col-md-8'> <Player /> </div>
        </div>
        <div className='row'>
        	<div className='col-md-8'> <OpenDoorButton testProp="whammmy" /> </div>
      	</div>
      </div>
    );
  }
}
