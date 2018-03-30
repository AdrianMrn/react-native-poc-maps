import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/LocationSearchStyle'

import Input from './Input';

export default class LocationSearch extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  onChange = () => {
    console.log(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Zoeken"
          onChangeText={text => { this.onChange(text) }}
          value={"kek"}
        />
      </View>
    )
  }
}
