import React, { Component } from "react";
import {connect} from 'react-redux'
import {
  NavBar,
  List,
  InputItem,
  Grid,
  Icon
} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/actions'
const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    flag: false
  }
  componentWillMount() {
    const emojis = [
      '😄','😁','😆','😅','🤣','🙃','😍','😘','😝','😑','🤮','😷','😓','👿','👻','👋',
      '😄','😁','😆','😅','🤣','🙃','😍','😘','😝','😑','🤮','😷','😓','👿','👻','💋',
      '😄','😁','😆','😅','🤣','🙃','😍','😘','😝','😑','🤮','😷','😓','👿','👻','🤟',
    ]
    this.emojis = emojis.map(item => ({text: item}))
  }
  componentDidMount() {
    if (this.list) {
      this.list.scrollTo(0, this.list.scrollHeight)
    }
  }
  
  componentDidUpdate() {
    if (this.list) {
      this.list.scrollTo(0, this.list.scrollHeight)
    }
  }
  componentWillUnmount() {
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }
  
  handleClick = (item) => {
    this.setState({content: this.state.content + item.text})
  }
  openEmojis = () => {
    this.setState({flag: true})
  }
  handleFocus = () => {
    this.setState({flag: false})
  }
  
  handleSend = () => {
    this.setState({flag: false})
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if (content) {
      // 发送请求（发送消息）
      this.props.sendMsg({from, to, content})
    }
    this.setState({content: ''})
  }
  
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const meId = user._id
    if (!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chat_id = [meId, targetId].sort().join('_')
    const aboutMsgs = chatMsgs.filter(msg => msg.chat_id === chat_id)
    let targetName = users[targetId].username
    let targetImg = require(`../../assets/img/${users[targetId].avatar}.png`)
    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type='left'/>} onLeftClick={() => this.props.history.goBack()}>{targetName}</NavBar>
        <List>
          <div className='public1' ref={(value) => this.list = value}>
            {
              aboutMsgs.map(msg => {
                if (meId === msg.to) { // 别人发给我的
                  return <Item thumb={targetImg} key={msg._id}>{msg.content}</Item>
                } else { // 我发给别人的
                  return <Item className='chat-me' extra='我' key={msg._id}>{msg.content}</Item>
                }
              })
            }
          </div>
        </List>
        <div className='position'>
          <div className={this.state.flag? 'div active' : 'div'}>
            <InputItem
              placeholder="请输入"
              value={this.state.content}
              onFocus={this.handleFocus}
              onChange={val => {this.setState({content: val})}}
              extra={
                <span>
                  <span style={{paddingRight: '5px'}} role='img' aria-label="donut" onClick={this.openEmojis}>😀</span>
                  <span onClick={this.handleSend}>发送</span>
                </span>
              } />
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={this.handleClick}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)