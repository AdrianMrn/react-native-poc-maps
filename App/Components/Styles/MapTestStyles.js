import { StyleSheet } from 'react-native'

// Enable this if you have app-wide application styles
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  // Merge in the screen styles from application styles
  //...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Metrics.screenHeight,
  },
  map: {
    // For Android :/
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})