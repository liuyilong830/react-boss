import {combineReducers} from 'redux'
import {Toast} from 'antd-mobile'
import {getRedirectTo} from '../unti/index'

import {
  AUTH_SUCCESS,
  ERROR_MESSAGE,
  RECEIVE_USER,
  RECEIVE_ERROR,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
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

const initUserList = []
function userList(state = initUserList, action) {
  
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users,chatMsgs, userid} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((prev, msg) => prev + (!msg.read&&msg.to === userid? 1 : 0), 0)
      }
    case RECEIVE_MSG:
      const {msg, id} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, msg],
        unReadCount: state.unReadCount + (!msg.read&&msg.to === id? 1 : 0)
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})