import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapTest from '../Components/MapTest';
import NewProblemForm from '../Components/NewProblemForm';
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/MapTestScreenStyle'

class MapTestScreen extends Component {
  constructor() {
    super();

    const locations = [
      { title: 'Location A', latitude: 37.78825, longitude: -122.4324 },
      { title: 'Location B', latitude: 37.75825, longitude: -122.4624 }
    ]

    this.state = {
      pickingOnMap: false,
      showModal: false,
      // form elements
      location: '',
      title: '',
      description: '',
      newMarker: { title: 'Nieuwe locatie', latitude: null, longitude: null, render: false },
      locations: locations,
    }
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
  }

  abortAddProblem = () => {
    this.setState({
      pickingOnMap: false,
      showModal: false,
      location: '',
      title: '',
      description: '',
      newMarker: { title: 'Nieuwe locatie', latitude: null, longitude: null, render: false },
    });
  }

  submitProblem = () => {
    console.log(this.state);
  }

  render() {
    const { showModal, pickingOnMap, location, title, description, newMarker, locations } = this.state;

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
                location={location}
                title={title}
                description={description}
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
