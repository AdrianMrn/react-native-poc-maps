import React, { Component } from 'react'
import { ScrollView, View, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import API from '../Services/Api';
const api = API.create();

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Toast } from 'native-base';

import MapTest from '../Components/MapTest';
import NewProblemForm from '../Components/NewProblemForm';
import RoundedButton from '../Components/RoundedButton';
import LocationSearch from '../Components/LocationSearch';

// Styles
import styles from './Styles/MapTestScreenStyle'

class MapTestScreen extends Component {
  constructor() {
    super();

    this.state = {
      /* showToast: false, */
      pickingOnMap: false,
      showModal: false,
      locations: [],
      loading: false,
      userPosition: { latitude: null, longitude: null },
      // form elements
      address: '',
      title: '',
      description: '',
      newMarker: { title: 'Nieuwe locatie', latitude: null, longitude: null, render: false },
    }
  }

  componentWillMount = () => {
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

  abortAddProblem = () => {
    this.setState({
      pickingOnMap: false,
      showModal: false,
      loading: false,
      // form elements
      address: '',
      title: '',
      description: '',
      newMarker: { title: 'Nieuwe locatie', latitude: null, longitude: null, render: false },
    });
  }

  renderButton = () => {
    if (!this.state.pickingOnMap) {
      return (
        <Button rounded primary onPress={this.startPickingOnMap} style={styles.actionButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Nieuw probleem</Text>
        </Button>
      );
    } else {
      return (
        <Button rounded primary onPress={this.confirmLocation} style={styles.actionButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Plaats bevestigen</Text>
        </Button>
      );
    }
  }

  submitProblem = () => {
    // future: need type toggle (Suggestie/Probleem)
    const { title, description, address, newMarker } = this.state;

    if (title && (newMarker.latitude || address)) {
      this.setState({ loading: true });
      // disable all inputs & button && show loading circle
      api.createSuggestie({
        "titel": title,
        "type": "Suggestie",
        "beschrijving": description,
        "adres": address,
        "coords_lat": newMarker.latitude,
        "coords_lon": newMarker.longitude
      }).then((response) => {
        this.abortAddProblem();
        this.getLocations();
      })
    } else {
      /* Toast.show({
        text: 'Vul aub alle velden in!',
        position: 'top',
        buttonText: 'OK'
      }); */
    }
  }

  render() {
    const { showModal, pickingOnMap, address, title, description, newMarker, locations, loading } = this.state;
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
              address={address}
              title={title}
              description={description}
              loading={loading}
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
