import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Image } from 'react-native'
import styles from './Styles/MarkerDetailStyle'
import { Container, Content, Button, Icon, Text, Toast } from 'native-base';

export default class MarkerDetail extends Component {

  render() {
    const { closeDetail, location } = this.props;

    console.log(location);
    return (
      <Container>
        <TouchableOpacity style={location.imageuri ? { flex: 1 } : { flex: 2 }} onPress={() => closeDetail()} />
        <View style={[styles.contentContainer, location.imageuri ? { flex: 2 } : { flex: 1 }]}>
          <ScrollView bounces={false}>
            <Text style={styles.address}>{location.address}</Text>
            <Text style={styles.title}>{location.title}</Text>
            <Text style={styles.description}>{location.description}</Text>
            <Image style={styles.image} source={{ uri: location.imageuri }} />
          </ScrollView>
        </View>
      </Container>
    )
  }
}
