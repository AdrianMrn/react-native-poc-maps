import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'
import nativeBaseColors from '../../../native-base-theme/variables/commonColor';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  title: {
    color: nativeBaseColors.brandDanger,
    fontSize: 26,
    textAlign:'center',
  },
  subtitle: {
    color: nativeBaseColors.brandDanger,
    fontSize: 16,
    textAlign:'center',
    paddingHorizontal: Metrics.doubleBaseMargin
  }
})
