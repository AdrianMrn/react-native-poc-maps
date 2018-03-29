import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import Input from './Input'
import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

export default class NewProblemForm extends React.Component {
  renderButton = () => {
    const { loading, submitProblem } = this.props;
    if (loading) {
      return (
        <RoundedButton>
          Laden
        </RoundedButton>
      );
    } else {
      return (
        <RoundedButton onPress={submitProblem}>
          Bevestigen
        </RoundedButton>
      );
    }
  }

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem } = this.props;
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
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
          <KeyboardAvoidingView>
            <Text style={styles.sectionText}>
              Nieuw probleem
            </Text>
            <Input
              placeholder="locatie"
              onChangeText={text => { onInputChange(text, 'address') }}
              value={address}
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
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.submitButton}>
          {this.renderButton()}
        </View>
      </View>
    )
  }
}
