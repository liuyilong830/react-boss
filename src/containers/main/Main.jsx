import React, { Component } from "react";
import {Switch, Route} from 'react-router-dom'

import PerfectUserInfo from "../perfect-user-info/PerfectUserInfo";

export default class Main extends Component {
  
  render() {
    return (
      <div>
        <Switch>
          <Route path='/bossInfo' component={PerfectUserInfo}/>
          <Route path='/staffInfo' component={PerfectUserInfo}/>
        </Switch>
      </div>
    )
  }
}