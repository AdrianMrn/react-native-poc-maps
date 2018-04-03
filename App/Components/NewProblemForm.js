import React from 'react'
import { ScrollView, Image, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Form, Input, Item, Label, Thumbnail } from 'native-base';
const ImagePicker = require('react-native-image-picker');

export default class NewProblemForm extends React.Component {
  constructor() {
    super();

    this.state = {
      imageSource: null,
    }
  }

  renderButton = () => {
    const { loading, submitProblem } = this.props;
    if (loading) {
      return (
        <Button full primary>
          <Spinner color='white' />
        </Button>
      );
    } else {
      return (
        <Button full primary onPress={submitProblem}>
          <Text style={{ color: 'white', fontSize: 16 }}>Bevestigen</Text>
        </Button>
      );
    }
  }

  startPickingImage = () => {
    ImagePicker.showImagePicker({
      title: 'Foto kiezen',
      cameraType: 'back',
      mediaType: 'photo',
    }, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageSource: source
        });
      }
    });
  }

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem, showErrors } = this.props;
    return (
      <Container>
        <Content padder>
          <Button transparent onPress={abortAddProblem}>
            <Icon name='arrow-back' />
          </Button>
          {/* <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}> */}
          <Form>
            <Item error={!address && showErrors}>
              <Label>Adres</Label>
              <Input
                onChangeText={text => { onInputChange(text, 'address') }}
                value={address}
              />
              <Button transparent onPress={startPickingOnMap}>
                <Icon name='md-create' />
              </Button>
            </Item>

            <Item floatingLabel error={!title && showErrors}>
              <Label>Titel</Label>
              <Input
                onChangeText={text => { onInputChange(text, 'title') }}
                value={title}
                focus
              />
            </Item>

            <Item floatingLabel>
              <Label>Beschrijving</Label>
              <Input
                onChangeText={text => { onInputChange(text, 'description') }}
                value={description}
              />
            </Item>

            <Button primary onPress={this.startPickingImage} style={styles.addImageButton}>
              <Icon name='md-images' />
              <Text>Foto toevoegen</Text>
            </Button>
            {!!this.state.imageSource &&
              <Image source={{ uri: this.state.imageSource.uri }} style={styles.imagePreview} />
            }

          </Form>
        </Content>

        <Footer>
          <FooterTab>
            {this.renderButton()}
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
