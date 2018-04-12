import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Images from '../Themes/Images';
import Colors from '../Themes/Colors';

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
        showSkip={false}
        nextLabel={"Volgende"}
        DoneButtonComponent={this.Done}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image style={{ height: 200, width: 200 }} source={Images.CityInputLogo} />,
            title: <Text style={styles.title}>Met <Text style={{fontWeight: '900', color:'#03a9f4'}}>City Input</Text> laat je je stad weten wat jij anders wilt!</Text>,
            subtitle: <Text style={[styles.subtitle, {color:'rgba(0,0,0,0.5)'}]}>In de volgende stappen leggen we uit hoe de app werkt.</Text>,
          },
          {
            backgroundColor: Colors.cityInputColor,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-pin-outline' />,
            title: 'Stap 1',
            subtitle: <Text style={styles.subtitle}>Selecteer de <Text style={styles.boldText}>locatie</Text> van je suggestie op de kaart.</Text>,
          },
          {
            backgroundColor: Colors.cityInputColor,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-list-outline' />,
            title: 'Stap 2',
            subtitle: <Text style={styles.subtitle}>Vervolledig je suggestie met wat <Text style={styles.boldText}>details</Text> en voeg eventueel een <Text style={styles.boldText}>foto</Text> toe.</Text>,
          },
          {
            backgroundColor: Colors.cityInputColor,
            image: <Icon style={{ color: '#fff', fontSize: 100 }} name='ios-send-outline' />,
            title: 'Stap 3',
            subtitle: <Text style={styles.subtitle}>Kijk je gegevens na, <Text style={styles.boldText}>verzend je suggestie</Text> en bekijk ze op de kaart.</Text>,
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
