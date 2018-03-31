import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  callout: {
    position: 'relative',
    flex: 1,
    maxWidth: Metrics.screenWidth * 2/3,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22,
  }
})
