import React, {Component} from 'react';

export default class Video extends Component {

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
      <div>
       <span>{this.state.data}</span>
      </div>

    );
  }
}
