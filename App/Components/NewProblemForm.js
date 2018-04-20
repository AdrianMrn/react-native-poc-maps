import React from 'react'
import { ScrollView, Image, View, TouchableOpacity, Platform, SafeAreaView } from 'react-native'

import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

import Colors from '../Themes/Colors';

import { Container, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Form, Input, Item, Label, Badge, Textarea } from 'native-base';

export default class NewProblemForm extends React.Component {
  renderButton = () => {
    const { loading, submitProblem } = this.props;
    if (loading) {
      return (
        <Button full style={{ backgroundColor: Colors.cityInputColor }}>
          <Spinner color='white' />
        </Button>
      );
    } else {
      return (
        <Button full style={{ backgroundColor: Colors.cityInputColor }} onPress={submitProblem}>
          <Text style={{ color: 'white', fontSize: 16 }}>Bevestigen</Text>
        </Button>
      );
    }
  }

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem, showErrors, imageSource, startPickingImage, deleteImage } = this.props;
    return (
      <Container>
        <Content padder>
          <SafeAreaView>
            <View style={styles.header}>
              <Button transparent onPress={abortAddProblem}>
                <Icon style={{ color: Colors.cityInputColor }} name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} />
              </Button>
              {!imageSource &&
                <Button style={styles.addImageButton} onPress={startPickingImage}>
                  <Icon style={{ marginRight: 0 }} name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'} />
                  <Text>Foto toevoegen</Text>
                </Button>
              }
            </View>
          </SafeAreaView>
          <SafeAreaView>
            <Form>
              <View style={styles.itemContainer}>
                <Label style={styles.textareaLabel}>Adres</Label>
                <Input
                  style={[styles.textStyle, styles.addressInput]}
                  onChangeText={text => { onInputChange(text, 'address') }}
                  value={address}
                  maxLength={200}
                  multiline
                />
                <TouchableOpacity style={styles.editIcon} onPress={() => startPickingOnMap()}>
                  <Icon style={{ color: Colors.cityInputColor }} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
                </TouchableOpacity>
              </View>

              <View style={styles.itemContainer}>
                <Label style={styles.textareaLabel}>Titel</Label>
                <Input
                  style={styles.textStyle}
                  onChangeText={text => { onInputChange(text, 'title') }}
                  value={title}
                  focus
                  maxLength={50}
                  multiline
                />
              </View>

              <View style={styles.itemContainer}>
                <Label style={styles.textareaLabel}>Beschrijving</Label>
                <Input
                  style={styles.textStyle}
                  onChangeText={text => { onInputChange(text, 'description') }}
                  value={description}
                  maxLength={5000}
                  multiline
                />
              </View>

              <View style={styles.imageAddSection}>
                {!!imageSource &&
                  <View>
                    <Image source={{ uri: imageSource.uri }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.deleteImageContainer} onPress={deleteImage}>
                      <Icon style={{ color: '#14171a' }} name={Platform.OS === 'ios' ? 'ios-close-circle-outline' : 'md-close-circle'} />
                    </TouchableOpacity>
                  </View>
                }
              </View>

            </Form>
          </SafeAreaView>
        </Content>

          <Footer style={{ backgroundColor: 'white' }}>
            <FooterTab>
              {this.renderButton()}
            </FooterTab>
          </Footer>

      </Container>
    )
  }
}
