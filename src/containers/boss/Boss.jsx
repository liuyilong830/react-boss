import React, { Component } from "react";
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from "../../components/user-list/UserList";

class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('dashen')
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
)(Boss)