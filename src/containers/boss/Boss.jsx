import React, { Component } from "react";
import {connect} from 'react-redux'

class Boss extends Component {
  
  render() {
    return (
      <div className='public'>大神列表</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Boss)