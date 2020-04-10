import React, { Component } from "react";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from 'antd-mobile'

import Logo from '../../components/logo/Logo'

class Login extends Component {
  state = {
    username: '',  // 用户名
    password: '',  // 密码
  }
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  login = () => {
    this.props.login(this.state)
  }
  toRegister = () => {
    this.props.history.replace('/register')
  }
  
  render() {
    if (this.props.user.toReplacePath) {
      return <Redirect to={this.props.user.toReplacePath}/>
    }
    return (
      <div>
        <NavBar>阿龙直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)