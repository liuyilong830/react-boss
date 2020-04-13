import React, { Component } from "react";
import {connect} from 'react-redux'

class Message extends Component {
  
  render() {
    return (
      <div className='public'>Message</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Message)