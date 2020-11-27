import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  TouchableHighlight,
  Modal,
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
      modalVisible: false,
      userNickName: "",
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

  handleModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };



  onPressDetailButton = (userKey) => {
    this.handleModalVisible()
    console.log(this.state.userName)
    this.setState({
      selectedProfile: userKey,
    });
    var query = ref.orderByChild('key').equalTo(userKey);
    query.once('value', (snapshot) => {
      let userName;
      let twitterUserName;
      let userNickName;
      snapshot.forEach((profile) => {
        console.log(profile.key + ': ' + profile.val().githubUserName)  
        userName = profile.val().githubUserName
        twitterUserName = profile.val().twitterUserName
        userNickName = profile.val().nickname
      })
        this.setState({
        userName: userName.toString(),
        userTwitterName: twitterUserName.toString(),
        userNickName: userNickName.toString()
      })
      console.log(this.state.userName , "" , this.state.userTwitterName) 
      // this.props.userRequest(this.state.userName);
    });
    console.log(this.props.userProfile);
  }
  onConfirmButtonPressed = () => {
    this.props.userRequest(this.state.userName);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isNameTrue) {
      this.props.navigation.navigate({routeName: 'DetailedInformation'});
    }
    if (newProps.userFailed) {
      this.setState({isNameTrue: false});
    }
    if (newProps.isTwitterNameTrue) {
      this.props.navigation.navigate({routeName: 'DetailedInformation'});
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

  renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ARE YOU SURE TO SEE THE DETAILS? {'\n'} User Name:{' '}
              {this.state.userNickName} {'\n'} User GitHub Name:{' '}
              {this.state.userName} {'\n'} User Twitter Name:{' '}
              {this.state.userTwitterName} {'\n'} 
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#803262',
                }}
                onPress={() => {
                  this.handleModalVisible();
                }}>
                <Text style={styles.textStyle}>DECLINE</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#803262'}}
                onPress={() => {
                  this.handleModalVisible();
                  this.onConfirmButtonPressed();
                }}>
                <Text style={styles.textStyle}>CONFIRM</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
        {this.renderModal()}
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
