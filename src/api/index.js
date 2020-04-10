import ajax from './ajax'

export const reqLogin = (user) => ajax('/login', user, 'post')

export const reqRegister = (user) => ajax('/register', user, 'post')