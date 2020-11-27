import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Header} from 'react-native-elements';
import styles from '../Styles/UserScreenStyles';
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {signout} from './AuthForm';
import {connect} from 'react-redux';
import UserActions from '../Redux/UserRedux';
import TwitterActions from '../Redux/TwitterRedux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-community/picker';

const {currentUser} = auth();
const db = database();

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      error: null,
      isNameTrue: null,
      userFailed: null,
      selectedAPI: 'GitHub',
      isGitHubSelected: true,
      headerName: '',
      screen_name: '',
      isTwitterNameTrue: null,
      twitterFailed: null,
    };
  }

  onSearchButtonPressed = () => {
    if (this.state.isGitHubSelected == true) {
      this.props.userRequest(this.state.userName);
      console.log('User Profile: ' + this.state.userName);
    } else {
      this.props.twitterRequest(this.state.userName);
      console.log(this.props.twitterProfile);
    }
  };

  onCreateButtonPressed = () => {
    this.props.navigation.navigate({routeName: 'SavedScreen'});
  };

  componentDidMount() {
    this.setState({headerName: currentUser.displayName});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isNameTrue) {
      this.props.navigation.navigate({routeName: 'ProfileScreen'});
    }
    if (newProps.userFailed) {
      this.setState({isNameTrue: false});
    }
    if (newProps.isTwitterNameTrue) {
      this.props.navigation.navigate({routeName: 'LaunchScreen'});
    }
    if (newProps.twitterFailed) {
      this.setState({isNameTrue: false});
    }
  }

  onSignedOut = () => {
    this.props.navigation.navigate({routeName: 'LoginScreen'});
  };

  render() {
    return (
      <ImageBackground
        source={Images.background}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.mainContainer}>
            <Header
              style={styles.containerStyle}
              leftComponent={{
                icon: 'arrow-back',
                size: 24,
                color: '#fff',
                onPress: () => this.props.navigation.goBack(),
              }}
              centerComponent={{
                text: this.state.headerName,
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
            <KeyboardAvoidingView>
              <View></View>
              <Image style={styles.logo} source={Images.ieuLogo} />
              <View style={styles.viewStyle}>
                <Text style={styles.subtitleText}>Please Enter an User ID</Text>
                <View>
                  <Icon
                    name={'ios-search'}
                    size={28}
                    color={'rgba(255, 255, 255, 0.7)'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.loginText}
                    onChangeText={(userName) => this.setState({userName})}
                    placeholder="Please enter an user name"
                    placeholderTextColor={
                      'rgba(255, 255, 255, 0.7)'
                    }></TextInput>
                </View>
                <Text style={styles.ApiText}>
                  Please select an App that you want to make search
                </Text>
                <Picker
                  selectedValue={this.state.selectedAPI}
                  style={{height: 50, width: 150, color: 'white'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      selectedAPI: itemValue,
                      isGitHubSelected: !this.state.isGitHubSelected,
                    }),
                    console.log(this.state.isGitHubSelected)
                  }>
                  <Picker.Item label="GitHub" value="github" />
                  <Picker.Item label="Twitter" value="twitter" />
                </Picker>
                <TouchableOpacity
                  onPress={() => this.onSearchButtonPressed()}
                  style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>SEARCH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onCreateButtonPressed()}
                  style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>CREATE A PROFILE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => signout(this.onSignedOut)}
                  style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>SIGN OUT</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userFailed: state.user.userFailed,
    isNameTrue: state.user.isNameTrue,
    userProfile: state.user.userProfile,
    twitterFailed: state.user.twitterFailed,
    isTwitterNameTrue: state.user.isTwitterNameTrue,
    twitterProfile: state.user.twitterProfile,
  };
};

// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

const mapDispatchToProps = (dispatch) => {
  return {
    userRequest: (userName) => dispatch(UserActions.userRequest(userName)),
    twitterRequest: (userName) => dispatch(TwitterActions.twitterRequest(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
