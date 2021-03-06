import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image,TouchableOpacity, ImageBackground } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';
import styles from '../Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {


  
  render () {
    return (
      <ImageBackground source={Images.firstBackground} style={styles.backgroundContainer} >
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.mainContainer}>
          
          <View style={styles.centered}>
            <Image source={Images.ieuLogo} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              Welcome to the our SE380 FINAL PROJECT app , please click the button to start using app and go to the login screen.
                    </Text>
                    < TouchableOpacity style= {styles.loginButton} onPress={() => this.props.navigation.navigate('LoginScreen')}>
           <Text style={styles.loginButtonText}>
             GO
           </Text>
          </TouchableOpacity>
          </View>
           
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}
