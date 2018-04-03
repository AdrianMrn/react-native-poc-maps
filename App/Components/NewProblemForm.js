import React from 'react'
import { ScrollView, Image, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner, Form, Input, Item, Label } from 'native-base';

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
          <Text style={{ color: 'white' }}>Bevestigen</Text>
        </Button>
      );
    }
  }

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button light onPress={abortAddProblem}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Nieuw</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {/* <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}> */}
          <Form>
            <Item>
              <Label>Adres</Label>
              <Input
                onChangeText={text => { onInputChange(text, 'address') }}
                value={address}
              />
              <Button transparent onPress={startPickingOnMap}>
                <Icon name='md-create' />
              </Button>
            </Item>

            <Item floatingLabel>
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
