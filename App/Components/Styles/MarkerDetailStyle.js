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
    right: Metrics.baseMargin,
    top: Metrics.baseMargin,
    padding: Metrics.baseMargin,
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
    marginHorizontal: Metrics.doubleBaseMargin * 2,
  },
  description: {
    fontSize: 16,
    color: Colors.charcoal,
    textAlign: 'center',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  imageContainer: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 3,
    borderRadius: Metrics.screenWidth / 6,
    marginTop: Metrics.doubleBaseMargin
  },
  image: {
    borderRadius: Metrics.screenWidth / 6,
    width: Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 3,
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (Metrics.screenWidth / 2) - 40,
  },
  contain: {
    flex: 1,
    alignSelf: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    borderRadius: 0,
    marginTop: 0
  },
})
