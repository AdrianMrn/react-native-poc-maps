import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'

import Input from './Input'
import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

export default class NewProblemForm extends React.Component {


  render() {
    const { startPickingOnMap, onInputChange, submitProblem, location, title, description, abortAddProblem } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={abortAddProblem} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Text>X</Text>
          {/* <Image source={Images.closeButton} /> */}
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          <Text style={styles.sectionText}>
            Nieuw probleem
          </Text>
          <Input
            placeholder="locatie"
            onChangeText={text => { onInputChange(text, 'location') }}
            value={location}
          />
          <RoundedButton onPress={startPickingOnMap}>Op kaart aanduiden</RoundedButton>
          <Input
            placeholder="titel"
            onChangeText={text => { onInputChange(text, 'title') }}
            value={title}
          />
          <Input
            placeholder="beschrijving"
            onChangeText={text => { onInputChange(text, 'description') }}
            value={description}
          />
        </ScrollView>
        <View style={styles.submitButton}>
          <RoundedButton onPress={this.submitProblem}>
            Bevestigen
          </RoundedButton>
        </View>
      </View>
    )
  }
}
