import axios from 'axios'

const instance = axios.create({
  timeout: 10000
})

instance.interceptors.request.use(config => {
  return config
},err => {
  console.log(err)
})

instance.interceptors.response.use(response => {
  return response.data
},err => {
  return Promise.reject(err)
})

export default function ajax(url, data = {}, method= 'GET') {
  if (method.toUpperCase() === 'GET') {
    return instance({
      url,
      params: data
    })
  } else {
    return instance({
      method: 'post',
      url,
      data
    })
  }
}