import React, {Component} from 'react';
import styles from './Player.less';

export default class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    if (socket && !this.onMsgListener) {
      this.onMsgListener = socket.on('videoFrame', this.onMessageReceived);
    }
  }

 onMessageReceived = (data) => {
    this.setState({data});
  }

  render() {
    return (
	    <div className="embed-responsive embed-responsive-16by9">
			  <img className="embed-responsive-item" src="data:image/gif;base64,{this.state.data}" />
			</div>
  	)
  }
}
