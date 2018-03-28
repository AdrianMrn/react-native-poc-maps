import React from 'react'
import { View, Modal, Text } from 'react-native'

import RoundedButton from './RoundedButton'


export default class NewProblemButton extends React.Component {
  render() {
    const { toggleModal } = this.props
    return (
      <View>
        <RoundedButton onPress={toggleModal}>
          Nieuw Probleem
        </RoundedButton>
      </View>
    )
  }
}
