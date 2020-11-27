import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem, List, ButtonGroup} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/SavedProfilesListStyles';
import UserActions from '../Redux/UserRedux';
import TwitterActions from '../Redux/TwitterRedux';
import {connect} from 'react-redux';

const {currentUser} = auth();
const db = database();
const ref = db.ref(`/users/${currentUser.uid}`);

class SavedProfilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfiles: [],
      loading: false,
      selectedProfile: null,
      buttons: ['GitHub', 'Twitter'],
      userName: "",
      error: null,
      isNameTrue: null,
      userFailed: null,
      isTwitterNameTrue: null,
      twitterFailed: null,
      userTwitterName: "",
    };
  }

  componentDidMount() {
    db.ref(`/users/${currentUser.uid}`).on('value', async (snapshot) => {
      var savedProfilesArray = [];
      snapshot.forEach((child) => {
        savedProfilesArray.push({
          key: child.val().key,
          nickname: child.val().nickname,
          twitterName: child.val().twitterUserName,
          githubUserName: child.val().githubUserName,
        });
      });

      this.setState({savedProfiles: savedProfilesArray});
      console.log(this.state.savedProfiles);
    });
  }

  onPressDetailButton = async (userKey) => {
    
    console.log(this.state.userName)
    this.setState({
      selectedProfile: userKey,
    });

    var query = ref.orderByChild('key').equalTo(userKey);
    query.once('value', (snapshot) => {
      let userName;
      let twitterUserName;
      snapshot.forEach((profile) => {
        console.log(profile.key + ': ' + profile.val().githubUserName)  
        userName = profile.val().githubUserName
        twitterUserName = profile.val().twitterUserName
      })
        this.setState({
        userName: userName.toString(),
        userTwitterName: twitterUserName.toString()
      })
      console.log(this.state.userName , "" , this.state.userTwitterName) 
    });
    this.props.userRequest(this.state.userName);
    console.log(this.props.userProfile);
   await this.props.navigation.navigate('DetailedInformation', {userKey: userKey});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isNameTrue) {
      this.props.navigation.navigate({routeName: 'LaunchScreen'});
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

  renderItem = ({item}) => (
    <ListItem
      title={item.nickname}
      titleStyle={{fontSize: 24}}
      // leftAvatar={{ source: { uri: this.props.userProfile.avatar_url } }}
      bottomDivider
      chevron
      style={{paddingTop: 2, borderBottomWidth: 1, color: '#871F78'}}
      containerStyle={{backgroundColor: '#BC01FF'}}
      button
      onPress={() => this.onPressDetailButton(item.key)}
    />
  );

  render() {
    return (
      <ImageBackground
        source={Images.background}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.scrollContainer}>
          <ScrollView style={styles.mainContainer}>
            <KeyboardAvoidingView>
              <Header
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
                  width: '100%',
                }}
              />
              <Image style={styles.logo} source={Images.ieuLogo} />
              <View stlye={styles.listStyle}>
                <FlatList
                  keyExtractor={(item) => item.key}
                  data={this.state.savedProfiles}
                  renderItem={this.renderItem}
                  extraData={this.state.selectedProfile}
                />
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
    twitterRequest: (userName) =>
      dispatch(TwitterActions.twitterRequest(userName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedProfilesList);
