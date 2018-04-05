import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OnboardingScreenStyle'
import Onboarding from 'react-native-onboarding-swiper';

class OnboardingScreen extends Component {
  onboardingDone = () => {
    try {
      AsyncStorage.setItem('onboardingDone', 'yes', () => {
        this.props.navigation.navigate('MapTestScreen');
      });
    } catch (error) {
      console.log(":(", error);
    }
  }


  render() {
    return (
      <Onboarding
        onDone={() => this.onboardingDone()}
        onSkip={() => this.onboardingDone()}
        skipLabel={"Overslagen"}
        nextLabel={"Volgende"}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)
