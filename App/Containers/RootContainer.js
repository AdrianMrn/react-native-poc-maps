import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'

import { Root } from "native-base";

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <Root>
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
        </View>
      </Root>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
