import React, { Component } from 'react'
import { ScrollView, View, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Toast } from 'native-base';
const ImagePicker = require('react-native-image-picker');

import MapTest from '../Components/MapTest';
import NewProblemForm from '../Components/NewProblemForm';
import RoundedButton from '../Components/RoundedButton';
import LocationSearch from '../Components/LocationSearch';
// Styles
import styles from './Styles/MapTestScreenStyle'

const INITIAL_STATE = {
  pickingOnMap: false,
  showModal: false,
  loading: false,
  // form elements
  address: '',
  title: '',
  description: '',
  newMarker: { title: 'Nieuwe locatie', latitude: null, longitude: null, render: false },
  showErrors: false,
  imageSource: null
}

class MapTestScreen extends Component {
  constructor() {
    super();

    this.state = {
      locations: [],
      userPosition: { latitude: null, longitude: null },
      // should be refreshed on form abort/submit
      ...INITIAL_STATE
    }
  }

  componentDidMount = () => {
    this.getLocations();
  }

  getLocations = () => {
    // future: load in on toggle background (focus)
    api.getSuggesties()
      .then((response) => {
        this.setState({
          locations: response
        });
      });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  startPickingOnMap = () => {
    Toast.show({
      text: 'Duw op de kaart om een plaats te kiezen!',
      position: 'top',
      buttonText: 'OK',
      duration: 7000
    });

    const { newMarker, userPosition } = this.state;
    const updatedState = {
      pickingOnMap: true,
      showModal: false
    };

    if (!newMarker.latitude) {
      if (userPosition.latitude) {
        updatedState.newMarker = { latitude: userPosition.latitude, longitude: userPosition.longitude, render: true }
      }
    }

    this.setState({
      ...updatedState
    });
  }

  setUserLocationInState = (position) => {
    this.setState({
      userPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    });
  }

  onMapPress = (coordinates) => {
    if (this.state.pickingOnMap) {
      const updatedMarker = {
        ...this.state.newMarker,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        render: true,
      };
      this.setState({
        newMarker: updatedMarker
      });
    }
  }

  confirmLocation = () => {
    this.setState({
      pickingOnMap: false,
      showModal: true
    });
    // start calculating address from coordinates (API call)
    api.reverseGeocode(this.state.newMarker).then((result) => {
      this.setState({
        address: result
      });
    });
  }

  onInputChange = (text, type) => {
    this.setState({
      ...this.state,
      [type]: text,
    });
    // future: if (type === address) { // address autocomplete }
  }

  startPickingImage = () => {
    ImagePicker.showImagePicker({
      title: 'Foto kiezen',
      cameraType: 'back',
      mediaType: 'photo',
      maxWidth: 1280,
      maxHeight: 1280,
    }, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source
        });
      }
    });
  }

  deleteImage = () => {
    this.setState({
      imageSource: null
    });
  }

  abortAddProblem = () => {
    this.setState({
      ...INITIAL_STATE
    });
  }

  renderButton = () => {
    if (!this.state.pickingOnMap) {
      return (
        <Button rounded primary onPress={this.startPickingOnMap} style={styles.actionButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center'}}>Nieuw probleem</Text>
          <Icon name='ios-add' style={{ marginLeft: 0, }} />
        </Button>
      );
    } else {
      return (
        <Button rounded success onPress={this.confirmLocation} style={styles.actionButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Plaats bevestigen</Text>
          <Icon name='ios-checkmark' style={{ marginLeft: 0, }} />
        </Button>
      );
    }
  }

  submitProblem = () => {
    // future: need type toggle (Suggestie/Probleem)
    const { title, description, address, newMarker, imageSource } = this.state;

    if (title && (newMarker.latitude || address)) {
      this.setState({ loading: true });
      // disable all inputs & button && show loading circle
      api.createSuggestie({
        titel: title,
        type: "Suggestie",
        beschrijving: description,
        adres: address,
        coords_lat: newMarker.latitude,
        coords_lon: newMarker.longitude,
        image: imageSource
      }).then(() => {
        this.abortAddProblem();
        this.getLocations();
      })
    } else {
      // toast shows below modal: https://github.com/GeekyAnts/NativeBase/issues/985
      /* Toast.show({
        text: 'Vul aub alle velden in',
        position: 'top',
        buttonText: 'OK',
        duration: 7000,
        type: 'danger',
      }); */
      this.setState({ showErrors: true });
    }
  }

  render() {
    const { showModal, pickingOnMap, address, title, description, newMarker, locations, loading, showErrors, imageSource } = this.state;
    return (
      <Container>
        <View style={styles.mainContainer}>
          <MapTest
            onMapPress={this.onMapPress}
            setUserLocationInState={this.setUserLocationInState}
            newMarker={newMarker}
            locations={locations}
          />
          {pickingOnMap &&
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>Duw op de kaart om een plaats te kiezen</Text>
            </View>
          }
          {this.renderButton()}
          <Modal
            animationType="slide"
            visible={showModal}
            onRequestClose={this.toggleModal}
          >
            <NewProblemForm
              abortAddProblem={this.abortAddProblem}
              startPickingOnMap={this.startPickingOnMap}
              submitProblem={this.submitProblem}
              onInputChange={this.onInputChange}
              startPickingImage={this.startPickingImage}
              deleteImage={this.deleteImage}
              address={address}
              title={title}
              description={description}
              loading={loading}
              showErrors={showErrors}
              imageSource={imageSource}
            />
          </Modal>
        </View>
      </Container >
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapTestScreen)
