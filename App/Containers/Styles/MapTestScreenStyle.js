import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  locationSearch: {
    position: 'absolute',
    top: -Metrics.screenHeight + 24,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    backgroundColor: Colors.silver,
  },
  hintContainer: {
    position: 'absolute',
    top: -Metrics.screenHeight + 110,
    left: Metrics.baseMargin,
    right: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintText: {
    color: Colors.charcoal,
    fontSize: 16
  }
})
