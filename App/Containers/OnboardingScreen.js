import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OnboardingScreenStyle'
import Onboarding from 'react-native-onboarding-swiper';
import nativeBaseColors from '../../native-base-theme/variables/commonColor';

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

  Done = ({ isLight, ...props }) => (
    <TouchableOpacity {...props}>
      <Text style={{ fontSize: 16, color: '#fff', marginRight: 20 }}>
        Begrepen!
      </Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <Onboarding
        onDone={() => this.onboardingDone()}
        onSkip={() => this.onboardingDone()}
        skipLabel={"Overslagen"}
        nextLabel={"Volgende"}
        DoneButtonComponent={this.Done}
        pages={[
          {
            backgroundColor: nativeBaseColors.brandPrimary,
            image: <Text>logo</Text>,
            title: 'Smartcity Bewonersinput',
            subtitle: 'Laat je stad weten wat jij anders wilt!',
          },
          {
            backgroundColor: nativeBaseColors.brandDanger,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-pin-outline' />,
            title: 'Locatie',
            subtitle: 'Stap 1: Kies een plaats',
          },
          {
            backgroundColor: nativeBaseColors.brandInfo,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-list-outline' />,
            title: 'Details',
            subtitle: 'Stap 2: Vervolledig je suggestie en voeg eventueel een foto toe',
          },
          {
            backgroundColor: nativeBaseColors.brandSuccess,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-send-outline' />,
            title: 'Verzenden',
            subtitle: 'Stap 3: Stuur je suggestie door en bekijk ze op de kaart',
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
