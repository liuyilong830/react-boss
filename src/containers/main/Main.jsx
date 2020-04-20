import React, { Component } from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import  Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import PerfectUserInfo from "../perfect-user-info/PerfectUserInfo";
import Boss from "../boss/Boss";
import Staff from "../staff/Staff";
import Message from "../message/Message";
import Profile from "../profile/Profile";
import NotFound from "../../components/not-found/NotFound";
import NavFonter from "../../components/nav-fonter/NavFonter";
import Chat from "../chat/Chat";
import {getRedirectTo} from '../../unti/index'
import {getUser} from '../../redux/actions'

/**
 * 1.实现自动登录
 *    因为cookie中存放了userId，我们需要先判断是否存在 userId的cookie
 *    1) 没有 userId，则重定向到 /login
 *    2) 有 userId，则需要判断 redux 中的 user 是否有 _id
 *    3) 没有 _id，则发送请求，在请求的过程中先饭后空值
 *    4) 有 _id，则判断是否请求的是根路径
 *    5) 是根路径，则根据 user.type 和 user.avatar 来判断重定向的路径
 *    6) 不是，则返回相应的路径
 */

class Main extends Component {
  
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/staff', // 路由路径
      component: Staff,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/profile', // 路由路径
      component: Profile,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  
  componentDidMount() {
    const userId = Cookies.get('userId')
    const {_id} = this.props.user
    if (userId && !_id) {
      console.log('发送ajax请求')
      this.props.getUser()
    }
  }
  
  render() {
    // 1.取出 userId
    const userId = Cookies.get('userId')
    if (!userId) {
      return <Redirect to='/login'/>
    }
    let {user, location} = this.props
    if (!user._id) {
      return null
    }
    let path = location.pathname
    if (path === '/') {
      path = getRedirectTo(user.type, user.avatar)
      return <Redirect to={path}/>
    }
    const {navList} = this
    const currentNav = navList.find(item => item.path === path)
    
    const hidePath = user.type === 'laoban'? '/staff' : '/boss'
    const filterNavList = navList.filter(nav => nav.path !== hidePath)
    return (
      <div>
        {
          currentNav? <NavBar>{currentNav.title}</NavBar> : null
        }
        <Switch>
          {
            filterNavList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>)
          }
          <Route path='/bossInfo' component={PerfectUserInfo}/>
          <Route path='/staffInfo' component={PerfectUserInfo}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {
          currentNav? <NavFonter navList={navList} hidePath={hidePath}></NavFonter> : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)