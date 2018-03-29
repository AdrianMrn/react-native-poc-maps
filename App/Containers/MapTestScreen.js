import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import API from '../Services/Api';
const api = API.create();

import MapTest from '../Components/MapTest';
import NewProblemForm from '../Components/NewProblemForm';
import RoundedButton from '../Components/RoundedButton'

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
    this.setState({
      pickingOnMap: true,
    });
    this.toggleModal();
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

  pickLocation = () => {
    this.setState({
      pickingOnMap: false,
    });
    // future: start calculating address from coordinates (API call)

    // future: disable location input && show loading icon in location input until we get a response from API
    this.toggleModal();
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
        {/* <KeyboardAvoidingView behavior='position'> */}
        <MapTest
          onMapPress={this.onMapPress}
          newMarker={newMarker}
          pickingOnMap={pickingOnMap}
          locations={locations}
        />
        {/* </KeyboardAvoidingView> */}
        {!pickingOnMap &&
          <View>
            <View style={styles.actionButton}>
              <RoundedButton onPress={this.toggleModal}>
                Nieuw Probleem
              </RoundedButton>
            </View>
            <Modal
              visible={showModal}
              onRequestClose={this.toggleModal}>
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
            <View style={styles.actionButton}>
              <RoundedButton onPress={this.pickLocation}>
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
