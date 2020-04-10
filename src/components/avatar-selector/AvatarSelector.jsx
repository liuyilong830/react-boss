import React, { Component } from "react";
import PropTypes from 'prop-types'
import {
  List,
  Grid
} from 'antd-mobile'

export default class AvatarSelector extends Component {
  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        icon: require(`../../assets/img/头像${i + 1}.png`),
        text: `头像${i + 1}`
      })
    }
  }
  state = {
    icon: null
  }
  handleClick = ({text, icon}) => {
    this.setState({icon})
    this.props.setAvatar(text)
  }
  
  render() {
    const {icon} = this.state
    const listHeader = !icon ? '请选择头像' : (
      <div>
        <span>已选择头像：</span>
        <img src={icon} alt=""/>
      </div>
    )
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}