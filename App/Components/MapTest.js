import React from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import MapTestCallout from './MapTestCallout'
import Styles from './Styles/MapTestStyles'

import nativeBaseColors from '../../native-base-theme/variables/commonColor';

// Generate this MapHelpers file with `ignite generate map-utilities`
// You must have Ramda as a dev dependency to use this.
import { calculateRegion } from '../Lib/MapHelpers'

/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class MapTest extends React.Component {
  /* ***********************************************************
  * This generated code is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  constructor(props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * Set the array of locations to be displayed on your map. You'll need to define at least
    * a latitude and longitude as well as any additional information you wish to display.
    *************************************************************/
    /* const locations = [
      { title: 'Location A', latitude: 37.78825, longitude: -122.4324 },
      { title: 'Location B', latitude: 37.75825, longitude: -122.4624 }
    ] */
    /* ***********************************************************
    * STEP 2
    * Set your initial region either by dynamically calculating from a list of locations (as below)
    * or as a fixed point, eg: { latitude: 123, longitude: 123, latitudeDelta: 0.1, longitudeDelta: 0.1}
    * You can generate a handy `calculateRegion` function with
    * `ignite generate map-utilities`
    *************************************************************/
    const region = calculateRegion(props.locations, { latPadding: 0.05, longPadding: 0.05 })
    // const region = { latitude: 123, longitude: 123, latitudeDelta: 0.1, longitudeDelta: 0.1}
    // initializing new marker
    this.state = {
      region,
      showUserLocation: true
    }
    this.renderMapMarkers = this.renderMapMarkers.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new locations any time the
    * props change, do something like this:
    *************************************************************/
    /* this.setState({
      region: calculateRegion(newProps.locations, { latPadding: 0.1, longPadding: 0.1 })
    }); */
  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
  };

  componentDidMount = () => {
    return this.getCurrentLocation()
      .then(position => {
        if (position) {
          this.props.setUserLocationInState(position);
          navigator.geolocation.watchPosition(position => this.props.setUserLocationInState(position));
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
          });
        }
      })
      .catch(() => {
        this.setState({
          region: {
            latitude: 51.2477388,
            longitude: 4.4363558,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }
        })
      })
  }

  onRegionChange(newRegion) {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new locations when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    // const searchRegion = {
    //   ne_lat: newRegion.latitude + newRegion.latitudeDelta / 2,
    //   ne_long: newRegion.longitude + newRegion.longitudeDelta / 2,
    //   sw_lat: newRegion.latitude - newRegion.latitudeDelta / 2,
    //   sw_long: newRegion.longitude - newRegion.longitudeDelta / 2
    // }
    // Fetch new data...
  }

  calloutPress(location) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/

    /* console.tron.log(location) */ // Reactotron
  }

  renderMapMarkers(location) {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and location of the map marker.
    * Customize the callout in ./MapTestCallout.js
    *************************************************************/
    if (location.latitude && location.longitude) {
      return (
        <MapView.Marker key={`${location.title}${location.address}${location.latitude}`} coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
          <MapTestCallout location={location} onPress={this.calloutPress} />
        </MapView.Marker>
      )
    }
  }

  render() {
    const { newMarker, onMapPress, locations } = this.props;
    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={this.state.showUserLocation}
          onPress={(e) => { onMapPress(e.nativeEvent.coordinate) }}
          loadingEnabled
        >
          {locations.map((location) => this.renderMapMarkers(location))}
          {newMarker.render &&
            <MapView.Marker
              key={`${newMarker.title}${newMarker.address}${newMarker.latitude}`}
              coordinate={{ latitude: newMarker.latitude, longitude: newMarker.longitude }}
              draggable
              onDragEnd={(e) => { onMapPress(e.nativeEvent.coordinate) }}
              pinColor={nativeBaseColors.brandPrimary}
            />
          }
        </MapView>
      </View>
    )
  }
}

export default MapTest
