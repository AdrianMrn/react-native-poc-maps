import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
import { Container, Text, Spinner, Badge, Icon } from 'native-base';
import styles from './Styles/MarkerDetailStyle'
import Colors from '../Themes/Colors'

export default class MarkerDetail extends Component {
  constructor() {
    super();
    this.state = {
      showSpinner: true
    };
  }

  imageLoaded = () => {
    this.setState({
      showSpinner: false
    })
  }

  render() {
    const { closeDetail, location } = this.props;
    const { showSpinner } = this.state;

    return (
      <Container>
        <TouchableOpacity style={location.imageuri ? { flex: 1 } : { flex: 2 }} onPress={() => closeDetail()} />
        <View style={[styles.contentContainer, location.imageuri ? { flex: 2 } : { flex: 1 }]}>
          <ScrollView bounces={false}>
            <TouchableOpacity style={styles.closePopup} onPress={() => closeDetail()}>
              <Icon style={{ color: '#14171a' }} name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} />
            </TouchableOpacity>
            <Text style={styles.title}>{location.title}</Text>
            {
              !!location.imageuri &&
              <View>
              <Image style={styles.image} source={{ uri: location.imageuri }} onLoad={() => this.imageLoaded()} />
              {showSpinner &&
                <Spinner style={styles.spinner} color={Colors.cityInputColor} />
              }
              </View>
            }
            <Text style={styles.address}>{location.address}</Text>
            <Text style={styles.description}>{location.description}</Text>
          </ScrollView >
        </View >
      </Container >
    )
  }
}
