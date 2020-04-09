import React, { Component } from "react";

import './logo.css'
import logo from '../../assets/img/logo.png'

export default class Logo extends Component {
  
  render() {
    return (
      <div className='logo-component'>
        <img src={logo} alt="" className='logo'/>
      </div>
    )
  }
}