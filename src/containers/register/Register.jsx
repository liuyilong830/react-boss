import React, { Component } from "react";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
} from 'antd-mobile'

import {register} from '../../redux/actions'

import Logo from '../../components/logo/Logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',  // 用户名
    password: '',  // 密码
    password2: '',  // 确认密码
    type: 'laoban',  // 用户类型名称   dashen/laoban
  }
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  register = () => {
    this.props.register(this.state)
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  
  render() {
    let {type} = this.state
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
            <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'}  onClick={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)