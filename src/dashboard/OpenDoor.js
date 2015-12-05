import React, {Component} from 'react';

export default class OpenDoor extends Component {
  handleClick(){
    if (socket) {
      socket.emit('openDoor', true);
    }
  }

  render() {
    return (
      <div>
      <button onClick={this.handleClick}>OpenDoor</button>
      </div>

    );
  }
}
