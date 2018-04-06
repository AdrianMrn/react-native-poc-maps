import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: '#FFF',
  },
  address: {
    fontSize: 12,
    color: Colors.charcoal,
    textAlign: 'center',
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
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
    bottom: 0, */
    marginTop: Metrics.doubleBaseMargin
  }
})
