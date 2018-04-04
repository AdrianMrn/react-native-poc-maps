import React from 'react'
import { ScrollView, Image, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Form, Input, Item, Label, Badge } from 'native-base';

export default class NewProblemForm extends React.Component {
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

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem, showErrors, imageSource, startPickingImage, deleteImage } = this.props;
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

            <View style={styles.imageAddSection}>
              {!imageSource &&
                <Button primary onPress={startPickingImage}>
                  <Icon name='md-images' />
                  <Text>Foto toevoegen</Text>
                </Button>
              }
              {!!imageSource &&
                <View>
                  <Image source={{ uri: imageSource.uri }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.deleteImageContainer} onPress={deleteImage}>
                    <Badge style={styles.deleteImageButton}>
                      <Text>X</Text>
                    </Badge>
                  </TouchableOpacity>
                </View>
              }
            </View>

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
