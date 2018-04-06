import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin
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
    top: -Metrics.screenHeight + 125,
    left: Metrics.doubleBaseMargin,
    right: Metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintText: {
    color: Colors.coal,
    fontSize: 16,
    textAlign: 'center'
  },
  infoButton: {
    position: 'absolute',
    right: 15,
    bottom: 29,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
