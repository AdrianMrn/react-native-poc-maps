import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { Callout } from 'react-native-maps'
import Styles from './Styles/MapTestCalloutStyles'

export default class MapTestCallout extends React.Component {
  render() {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `Callout`
    *************************************************************/
    const { location, onPress } = this.props;
    return (
      <Callout style={Styles.callout} onPress={() => onPress(location.imageuri)}>
        <Text style={Styles.title}>{location.title}</Text>
        <Text>{location.description || "Geen beschrijving beschikbaar"}</Text>
        {!!location.imageuri &&
          <Text>Druk om de foto te tonen</Text>
        }
        {/* <Image style={Styles.image} source={{ uri: location.imageuri }} /> */}
      </Callout>
    )
  }
}
