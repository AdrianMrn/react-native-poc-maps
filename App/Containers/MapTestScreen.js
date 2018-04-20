import React, { Component } from 'react'
import { ScrollView, View, Modal, AsyncStorage, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import API from '../Services/Api';
const api = API.create();

import { Container, Button, Icon, Text, Toast } from 'native-base';
const ImagePicker = require('react-native-image-picker');
import Colors from '../Themes/Colors';

import MapTest from '../Components/MapTest';
import NewProblemForm from '../Components/NewProblemForm';
import MarkerDetail from '../Components/MarkerDetail';
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
  imageSource: null,
  selectedLocation: null,
  showDetailModal: false
}

class MapTestScreen extends Component {
  constructor() {
    super();

    try {
      AsyncStorage.getItem('onboardingDone', (err, value) => {
        if (value !== 'yes') {
          this.props.navigation.navigate('OnboardingScreen');
        }
      });
    } catch (error) { }

    this.state = {
      locations: [],
      userPosition: { latitude: null, longitude: null },
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
  toggleDetailModal = () => {
    this.setState({ showDetailModal: !this.state.showDetailModal })
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

  markerPress = (location) => {
    if (!this.state.pickingOnMap) {
      this.setState({
        selectedLocation: location,
        showDetailModal: true,
      });
    }
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
      maxWidth: 480,
      maxHeight: 480,
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true,
      }
    }, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else {
        const source = { uri: response.uri, type: response.type, name: response.fileName };
        this.setState({
          imageSource: source,
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
        <Button rounded onPress={this.startPickingOnMap} style={[styles.actionButton, { backgroundColor: Colors.cityInputColor }]}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Nieuw</Text>
          <Icon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} style={{ marginLeft: 0, }} />
        </Button>
      );
    } else {
      return (
        <Button rounded success onPress={this.confirmLocation} style={styles.actionButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Plaats bevestigen</Text>
          <Icon name={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'} style={{ marginLeft: 0, }} />
        </Button>
      );
    }
  }

  submitProblem = () => {
    // future: need type toggle (Suggestie/Probleem)
    const { title, description, address, newMarker, imageSource, imageType, imageName } = this.state;

    if (title && (newMarker.latitude || address)) {
      this.setState({ loading: true });
      // future: timeout after 10s and show error?
      api.createSuggestie({
        titel: title,
        type: "Suggestie",
        beschrijving: description,
        adres: address,
        coords_lat: newMarker.latitude,
        coords_lon: newMarker.longitude,
        image: imageSource,
      }).then(() => {
        this.abortAddProblem();
        this.getLocations();
        Toast.show({
          text: 'Suggestie toegevoegd',
          position: 'top',
          buttonText: 'OK',
          duration: 5000,
        });
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
    const { showModal, pickingOnMap, address, title, description, newMarker, locations, loading, showErrors, imageSource, showDetailModal, selectedLocation } = this.state;
    return (
      <Container>
        <StatusBar hidden={false} barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
        <View style={styles.mainContainer}>
          <MapTest
            onMapPress={this.onMapPress}
            setUserLocationInState={this.setUserLocationInState}
            markerPress={this.markerPress}
            newMarker={newMarker}
            locations={locations}
          />
          <TouchableOpacity style={styles.infoButton} onPress={() => this.props.navigation.navigate('OnboardingScreen')}>
            <Icon style={{ color: '#BDBDBD', fontSize: 45 }} name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle'} />
          </TouchableOpacity>
          {pickingOnMap &&
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>Druk op de kaart om een plaats te kiezen</Text>
            </View>
          }
          {this.renderButton()}
          <Modal // form
            animationType="slide"
            visible={showModal}
            onRequestClose={this.toggleModal}
            supportedOrientations={['portrait', 'landscape']}
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
          <Modal //Marker detail
            animationType="slide"
            visible={showDetailModal}
            onRequestClose={this.toggleDetailModal}
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
          >
            <MarkerDetail location={selectedLocation} closeDetail={this.toggleDetailModal} />
          </Modal>
        </View>
      </Container>
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
