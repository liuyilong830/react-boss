import React from "react"
import {render} from "react-dom"
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import './assets/css/base.css'
import './index.css'
import store from "./redux/store";
import Main from "./containers/main/Main";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";

render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route component={Main}/> {/*默认组件*/}
        </Switch>
      </HashRouter>
    </Provider>
  ),
  document.getElementById('root')
)