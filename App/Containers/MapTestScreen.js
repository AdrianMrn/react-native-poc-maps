import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, Modal } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapTest from '../Components/MapTest';
import NewProblemButton from '../Components/NewProblemButton';
import NewProblemForm from '../Components/NewProblemForm';

// Styles
import styles from './Styles/MapTestScreenStyle'

class MapTestScreen extends Component {
  state = {
    pickingOnMap: false,
    showModal: false
  }

  startPickingOnMap = () => {
    console.log("startPickingOnMap")
    this.setState({
      ...this.state,
      pickingOnMap: true,
      showModal: false
    });
  }

  pickLocation = () => {
    console.log("pickLocation")
    this.setState({
      ...this.state,
      pickingOnMap: false,
      showModal: true
    });
  }

  toggleModal = () => {
    console.log("toggleModal")
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* <KeyboardAvoidingView behavior='position'> */}
        <MapTest />
        {/* </KeyboardAvoidingView> */}
        <View style={styles.newProblemButton}>
          <NewProblemButton toggleModal={this.toggleModal} />
        </View>
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <NewProblemForm
            screenProps={{ toggle: this.toggleModal }}
            startPickingOnMap={this.startPickingOnMap}
          />
        </Modal>
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
