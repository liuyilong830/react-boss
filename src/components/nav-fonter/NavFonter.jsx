import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
const Item = TabBar.Item

class NavFonter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    hidePath: PropTypes.string.isRequired
  }
  
  render() {
    const {navList, hidePath} = this.props
    const path = this.props.location.pathname
    const filterNavList = navList.filter(nav => nav.path !== hidePath)
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white">
        {
          filterNavList.map(nav => <Item
            key={nav.path}
            title={nav.title}
            icon={{uri: require(`../../assets/img/${nav.icon}.png`)}}
            selectedIcon={{uri: require(`../../assets/img/${nav.icon}-selected.png`)}}
            selected={nav.path === path} onPress={() => this.props.history.replace(nav.path)}>
          </Item>)
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFonter)