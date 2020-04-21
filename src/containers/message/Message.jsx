import React, { Component } from "react";
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

class Message extends Component {
  
  getLastChatMsg = (chatMsgs, userid) => {
    const lastMsgsObj = {}
    chatMsgs.forEach(msg => {
      if (msg.to === userid && !msg.read) {
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }
      let chatId = msg.chat_id
      if (!lastMsgsObj[chatId]) {
        lastMsgsObj[chatId] = msg
      } else {
        let allUnReadCount = lastMsgsObj[chatId].unReadCount + msg.unReadCount
        if (msg.create_time > lastMsgsObj[chatId].create_time) {
          lastMsgsObj[chatId] = msg
        }
        lastMsgsObj[chatId].unReadCount = allUnReadCount
      }
    })
    const lastMsgs = Object.values(lastMsgsObj)
    return lastMsgs.sort((m1, m2) => m2.create_time - m1.create_time)
  }
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const lastMsg = this.getLastChatMsg(chatMsgs, user._id)
    lastMsg.forEach(msg => {
      if (user._id === msg.from) {
        msg.targetId = msg.to
      } else {
        msg.targetId = msg.from
      }
    })
    return (
      <div className='public'>
        <List>
          {
            lastMsg.map(msg => (
              <Item
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require(`../../assets/img/${users[msg.targetId].avatar}.png`)}
                arrow='horizontal'
                key={msg._id}
                onClick={() => this.props.history.push(`/chat/${msg.targetId}`)}
              >
                {users[msg.targetId].username}
                <Brief>{msg.content}</Brief>
              </Item>
            ))
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)