import io from 'socket.io-client'
import {
  reqLogin,
  reqRegister,
  reqUpdate,
  reqUser,
  reqUserList,
  reqChatMsgList,
  // reqReadMsg
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MESSAGE,
  RECEIVE_USER,
  RECEIVE_ERROR,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'

// 注册成功、登录成功、刷新状态的时候就需要获取该用户的消息列表
async function getMsgList(dispatch, userid) {
  initIO(userid, dispatch)
  const response = await reqChatMsgList()
  if (response.code === 200) {
    const {users, chatMsgs} = response.data
    dispatch(receiveMsgList({users, chatMsgs, userid}))
  }
}

// 封装 socket.io 的函数
function initIO(userid, dispatch) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receviceMsg', (chatMsg) => {
      dispatch(receiveMsg(chatMsg, userid))
    })
    io.socket.emit('setName', userid)
  }
}
// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    io.socket.emit('sendMsg', {from, to, content})
  }
}

// 同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMessage = (message) => ({type: ERROR_MESSAGE, data: message})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const receiveError = (message) => ({type: RECEIVE_ERROR, data: message})
const receiveUserList = (userlist) => ({type: RECEIVE_USER_LIST, data: userlist})
const receiveMsgList = (data) => ({type: RECEIVE_MSG_LIST, data})
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})

// 注册的异步action
export const register = (user) => {
  let {username, password, password2, type} = user
  // 前台验证数据是否可靠，若不可靠则直接返回一个同步errorMessage的action
  if (!username) {
    return errorMessage('请输入用户名!')
  } else if (password !== password2) {
    return errorMessage('两次密码必须一致!')
  }
  // 到这里说明数据是合法的，允许发送ajax请求
  return async dispatch => {
    const response = await reqRegister({username, password, type})
    if (response.code === 200) {
      getMsgList(dispatch, response.user._id)
      dispatch(authSuccess(response.user))
    } else {
      dispatch(errorMessage(response.message))
    }
  }
}
// 登录的异步action
export const login = (user) => {
  let {username, password} = user
  // 前台验证数据是否可靠，若不可靠则直接返回一个同步errorMessage的action
  if (!username) {
    return errorMessage('请输入用户名!')
  } else if (!password) {
    return errorMessage('请输入密码!')
  }
  // 到这里说明数据是合法的，允许发送ajax请求
  return async dispatch => {
    const response = await reqLogin(user)
    if (response.code === 200) {
      getMsgList(dispatch, response.user._id)
      dispatch(authSuccess(response.user))
    } else {
      dispatch(errorMessage(response.message))
    }
  }
}

export const update = (user) => {
  if (!user.avatar) {
    return errorMessage('用户头像必须选择')
  }
  return async dispatch => {
    const response = await reqUpdate(user)
    if (response.code === 200) {
      dispatch(receiveUser(response.user))
    } else {
      dispatch(receiveError(response.message))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    if (response.code === 200) {
      getMsgList(dispatch, response.user._id)
      dispatch(receiveUser(response.user))
    } else {
      dispatch(receiveError(response.message))
    }
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    if (response.code === 200) {
      dispatch(receiveUserList(response.data))
    }
  }
}
