import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem, List} from 'react-native-elements';
import styles from '../Styles/LaunchScreenStyles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const {currentUser} = auth();
const db = database();

export default class SavedProfilesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          savedProfiles: [],
        };
      }

  fetchSavedProfiles() {
      const savedProfilesList =
    db.ref(`/users/${currentUser.uid}`).on('value', (snapshot) => {
        this.setState({savedProfiles: savedProfilesList})
      console.log('User data: ', snapshot.val());
    });
  }

  render() {
    return (
      <ImageBackground
        source={Images.background}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.scrollContainer}>
          <Header
            style={styles.containerStyle}
            leftComponent={{
              icon: 'arrow-back',
              size: 24,
              color: '#fff',
              onPress: () => this.props.navigation.goBack(),
            }}
            centerComponent={{
              text: currentUser.displayName,
              style: {color: '#fff'},
            }}
            rightComponent={{
              icon: 'home',
              color: '#fff',
              onPress: () =>
                this.props.navigation.navigate({routeName: 'LaunchScreen'}),
            }}
            containerStyle={{
              backgroundColor: '#432577',
              marginTop: -25,
            }}
          />
          <ScrollView style={styles.mainContainer}>
            <KeyboardAvoidingView></KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
