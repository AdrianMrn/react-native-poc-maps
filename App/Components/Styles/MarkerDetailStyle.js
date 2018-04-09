import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 3,
    borderColor: Colors.cityInputColor,
  },
  closePopup: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 5,
  },
  address: {
    fontSize: 12,
    color: Colors.charcoal,
    textAlign: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.coal,
    textAlign: 'center',
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  description: {
    fontSize: 16,
    color: Colors.charcoal,
    textAlign: 'center',
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    /* position: 'absolute',
    top: 0, */
    marginTop: Metrics.doubleBaseMargin
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (Metrics.screenWidth / 2) - 40,
  },
})
