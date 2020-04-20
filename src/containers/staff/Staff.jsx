import React, { Component } from "react";
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from "../../components/user-list/UserList";

class Staff extends Component {
  componentDidMount() {
    this.props.getUserList('laoban')
  }
  
  render() {
    return (
      <div className='public'>
        <UserList userList={this.props.userList}/>
      </div>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Staff)