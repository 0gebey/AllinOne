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
      
        <ImageBackground
        source={Images.background}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.mainContainer}>
            <KeyboardAvoidingView>
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
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
     </ImageBackground>

    )
  }
}
