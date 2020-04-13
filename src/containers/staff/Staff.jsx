import React, { Component } from "react";
import {connect} from 'react-redux'

class Staff extends Component {
  
  render() {
    return (
      <div className='public'>老板列表</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Staff)