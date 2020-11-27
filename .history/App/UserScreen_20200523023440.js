import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Header } from 'react-native-elements'
import styles from './Styles/UserScreenStyles'
import { View } from 'react-native-animatable';
import { Images } from './Themes';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import GitHub from './Api/GitHub';
import { signout } from './AuthForm';

class UserScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        userName: "",
        error: null,
        isNameTrue: null,
        userFailed: null,
  
      }
    }
      handlePress1 = () => {
      console.log("ok")
      this.props.userRequest(this.state.userName)
    }

    onSignedOut = () => {
      this.props.navigation.navigate('Auth');
    }
  
    cheatButton = () => {
      this.props.navigation.navigate({routeName: 'ProfileScreen'})
    }
    render() {
      return (
  
        <ImageBackground source={Images.background} style={styles.backgroundContainer}>
          <SafeAreaView style={styles.scrollContainer}>
            <ScrollView style={styles.mainContainer}>
              <Header style={styles.containerStyle}
                leftComponent={{ icon: 'arrow-back', size: 24, color: '#fff', onPress: () => this.props.navigation.goBack() }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: () => signout(this.onSignedOut) }}
                containerStyle={{
                  backgroundColor: '#432577',
                  marginTop: -25
                }}
              />
              <KeyboardAvoidingView>
                <View>
                </View>
                <Image style={styles.logo} source={Images.ieuLogo} />
                <View style={styles.viewStyle}>
                  <Text style={styles.subtitleText}>Please Enter an User ID</Text>
                  <View>
                    <Icon name={'ios-search'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput style={styles.loginText} onChangeText={userName => this.setState({ userName })} placeholder="Please enter an user name" placeholderTextColor={'rgba(255, 255, 255, 0.7)'}></TextInput>
                  </View>
                  < TouchableOpacity onPress={() => this.handlePress1()} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>
                      SEARCH
             </Text>
                  </TouchableOpacity>
                  < TouchableOpacity onPress={() => this.cheatButton()} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>
                      CHEAT
             </Text>
                  </TouchableOpacity>
                  <Image style={styles.logo1} source={Images.top_logo} />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      )
    }
  }
  

  

  
  export default UserScreen
  