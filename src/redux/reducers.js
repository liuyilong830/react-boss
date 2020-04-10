import {combineReducers} from 'redux'
import {Toast} from 'antd-mobile'

import {
  AUTH_SUCCESS,
  ERROR_MESSAGE
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
  toReplacePath: ''
}
function user(state = initUser, action) {
  
  switch (action.type) {
    case AUTH_SUCCESS:
      let toReplacePath = action.data.type === 'laoban' ? '/bossInfo' : '/staffInfo'
      return {...state, ...action.data, toReplacePath}
    case ERROR_MESSAGE:
      Toast.info(action.data, 2)
      return {...state, message: action.data}
    default:
      return state
  }
}

export default combineReducers({
  user,
})