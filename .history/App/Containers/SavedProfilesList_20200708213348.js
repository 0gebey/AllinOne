import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image,TouchableOpacity, ImageBackground } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';
import styles from '../Styles/LaunchScreenStyles';

export default class SavedProfilesList extends Component {


  
  render () {
    return (
      <ImageBackground source={Images.firstBackground} style={styles.backgroundContainer} >
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.mainContainer}>
          <KeyboardAvoidingView>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}
