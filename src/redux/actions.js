import {
  reqLogin,
  reqRegister
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MESSAGE
} from './action-types'

// 同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMessage = (message) => ({type: ERROR_MESSAGE, data: message})

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
      dispatch(authSuccess(response.user))
    } else {
      dispatch(errorMessage(response.message))
    }
  }
}