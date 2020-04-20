// 引入客服端的 io
import io from 'socket.io-client'

// 连接服务器，得到代表连接的 socket 对象
const socket = io('ws://localhost:4000')

// 绑定 receiveMessage 的监听，来接收服务器端发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器接收到了服务器发送的消息', data)
})

// 想服务器端发送消息
socket.emit('sendMsg', { name: 'Tom', date: Date.now()})
console.log('客户端向服务器端发送了消息：', { name: 'Tom', date: Date.now()})