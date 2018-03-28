import { StackNavigator } from 'react-navigation'
import MapTestScreen from '../Containers/MapTestScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MapTestScreen: { screen: MapTestScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'MapTestScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
