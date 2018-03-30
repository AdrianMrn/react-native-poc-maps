import React, { Component } from 'react'
import { ScrollView, View, Text, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import API from '../Services/Api';
const api = API.create();

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
      pickingOnMap: true
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
      console.log("missing some info (title && (newMarker.latitude || address)");
    }
  }

  render() {
    const { showModal, pickingOnMap, address, title, description, newMarker, locations, loading } = this.state;
    return (
      <View style={styles.mainContainer}>
        <MapTest
          onMapPress={this.onMapPress}
          setUserLocationInState={this.setUserLocationInState}
          newMarker={newMarker}
          locations={locations}
        />
        {!pickingOnMap &&
          <View>
            <View style={styles.actionButton}>
              <RoundedButton onPress={this.startPickingOnMap}>
                Nieuw Probleem
              </RoundedButton>
            </View>
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
        }
        {pickingOnMap &&
          <View>
            {/* <View style={styles.locationSearch}>
              <LocationSearch />
            </View> */}
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>Duw op de kaart om een plaats te kiezen</Text>
            </View>
            <View style={styles.actionButton}>
              <RoundedButton onPress={this.confirmLocation}>
                Plaats bevestigen
              </RoundedButton>
            </View>
          </View>
        }
      </View>
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
