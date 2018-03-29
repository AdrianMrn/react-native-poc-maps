import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})
