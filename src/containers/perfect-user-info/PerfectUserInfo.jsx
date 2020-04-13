import React, { Component } from "react";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'

import AvatarSelector from "../../components/avatar-selector/AvatarSelector";
import {update} from '../../redux/actions'

class PerfectUserInfo extends Component {
  state = {
    avatar: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  }
  
  setAvatar= (avatar) => {
    this.setState({avatar})
  }
  
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  save = () => {
    this.props.update(this.state)
  }
  
  render() {
    let {type, avatar} = this.props.user
    if (avatar) {
      let path = type === 'laoban'? '/boss' : '/staff'
      return <Redirect to={path}/>
    }
    let layout
    if (type === 'laoban') {
      layout = (
        <div>
          <InputItem placeholder='请输入招聘职位' onChange={val => {this.handleChange('post', val)}}>招聘职位:</InputItem>
          <InputItem placeholder='请输入公司名称' onChange={val => {this.handleChange('company', val)}}>公司名称:</InputItem>
          <InputItem placeholder='请输入职位薪资' onChange={val => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
          <TextareaItem title="职位要求:"
                        placeholder='请输入个人介绍'
                        rows={3} onChange={val => {this.handleChange('info', val)}}/>
        </div>
      )
    } else {
      layout = (
        <div>
          <InputItem placeholder='请输入求职岗位' onChange={val => {this.handleChange('post', val)}}>求职岗位:</InputItem>
          <TextareaItem title="个人介绍:"
                        placeholder='请输入个人介绍'
                        rows={3} onChange={val => {this.handleChange('info', val)}}/>
        </div>
      )
    }
    
    return (
      <div>
        <NavBar>{type === 'laoban'? '老板' : '大神'}信息完善</NavBar>
        <div className='normal'>
          <AvatarSelector setAvatar={this.setAvatar}></AvatarSelector>
          {layout}
          <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {update}
)(PerfectUserInfo)