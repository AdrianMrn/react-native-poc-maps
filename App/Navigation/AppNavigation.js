import { StackNavigator } from 'react-navigation'
import OnboardingScreen from '../Containers/OnboardingScreen'
import MapTestScreen from '../Containers/MapTestScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  OnboardingScreen: { screen: OnboardingScreen },
  MapTestScreen: { screen: MapTestScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MapTestScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
