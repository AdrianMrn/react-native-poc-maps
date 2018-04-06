import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'
import nativeBaseColors from '../../../native-base-theme/variables/commonColor';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#000',
    marginHorizontal: Metrics.doubleBaseMargin,
    paddingBottom: 15,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  boldText: {
    fontWeight: '900',
    color: '#fff'
  }
})
