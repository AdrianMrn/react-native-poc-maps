import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'

import Input from './Input'
import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

export default class NewProblemForm extends React.Component {
  state = {
    location: '',
    title: '',
    description: '',
  };

  onInputChange = (text, type) => {
    this.setState({
      ...this.state,
      [type]: text,
    });
  }

  chooseOnMap = () => {

  }

  submitProblem = () => {
    console.log(this.state);
  }

  render() {
    const { startPickingOnMap } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
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
            onChangeText={text => { this.onInputChange(text, 'location') }}
            value={this.state.location}
          />
          <RoundedButton onPress={startPickingOnMap}>Op kaart aanduiden</RoundedButton>
          <Input
            placeholder="titel"
            onChangeText={text => { this.onInputChange(text, 'title') }}
            value={this.state.title}
          />
          <Input
            placeholder="beschrijving"
            onChangeText={text => { this.onInputChange(text, 'description') }}
            value={this.state.description}
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
