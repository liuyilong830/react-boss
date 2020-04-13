import {combineReducers} from 'redux'
import {Toast} from 'antd-mobile'
import {getRedirectTo} from '../unti/index'

import {
  AUTH_SUCCESS,
  ERROR_MESSAGE,
  RECEIVE_USER,
  RECEIVE_ERROR
} from './action-types'

const initUser = {
  username: '',  // 用户名
  type: '',   // 人物类型
  message: '',  // 错误信息
  avatar: '', // 头像
  post: '',   // 职位
  info: '',  // 个人或职位信息
  company: '',  // 公司名称
  salary: '', // 月薪
  path: ''
}
function user(state = initUser, action) {
  
  switch (action.type) {
    case AUTH_SUCCESS:
      let {type, avatar} = action.data
      return {...state, ...action.data, path: getRedirectTo(type, avatar)}
    case ERROR_MESSAGE:
      Toast.info(action.data, 2)
      return {...state, message: action.data}
    case RECEIVE_USER:
      return action.data
    case RECEIVE_ERROR:
      Toast.info(action.data, 2)
      return initUser
    default:
      return state
  }
}

export default combineReducers({
  user,
})