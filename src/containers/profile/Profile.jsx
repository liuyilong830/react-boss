import React, { Component } from "react";
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {receiveError} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
class Profile extends Component {
  
  logout = () => {
    Modal.alert('退出', '确定退出登陆吗', [
      {
        text: '取消'
      },
      {
        text: '确定',
        onPress: () => {
          // 删除cookie中的userid
          Cookies.remove('userId')
          // 删除redux中的 user
          this.props.receiveError('退出成功')
        }
      }
    ])
  }
  render() {
    const {username, info, avatar, company, post, salary} = this.props.user
    return (
      <div className='public'>
        <Result
          img={<img src={require(`../../assets/img/${avatar}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {receiveError}
)(Profile)