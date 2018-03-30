import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  addingLocationHint: {
    position: 'absolute',
    top: -Metrics.screenHeight + 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
