import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addingLocationHint: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  }
})
