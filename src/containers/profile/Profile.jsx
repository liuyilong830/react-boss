import React, { Component } from "react";
import {connect} from 'react-redux'

class Profile extends Component {
  
  render() {
    return (
      <div className='public'>Profile</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Profile)