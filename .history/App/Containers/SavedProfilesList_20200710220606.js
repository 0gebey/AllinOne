import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';

import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem, List, ButtonGroup} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/SavedProfilesListStyles';
import axios from 'axios';

const {currentUser} = auth();
const db = database();
const accessToken =
  'AAAAAAAAAAAAAAAAAAAAAPxZFwEAAAAAJNlY8Xqxr3Z4aefvpKaZyh01K90%3DXkOj5o97VzZ4navVHoHqB3JeYUzaJuXbYBwvO1AkOnYrvBllhS';
const twitterUrl = 'https://api.twitter.com/1.1/users';
const gitHubUrl = 'https://api.github.com/';

const authAxios = axios.create({
  baseURL: twitterUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    // 'Access-Control-Allow-Origin' : '*',
  },
  timeout: 10000,
});
const gitHubAxios = axios.create({
  baseURL: gitHubUrl,
  headers: {
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  },
  timeout: 10000,
});

class SavedProfilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfiles: [],
      selectedProfile: null,
      userName: "",
      error: null,
      userTwitterName: "",
      modalVisible: false,
      userNickName: "",
      twitterProfile: null,
      gitHubProfile: null,
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
  
  handleGitHubRequest = async (userName) => {
    try {
      const gitHubProfile = await gitHubAxios.get('users/' + userName);
      this.setState({
        gitHubProfile: gitHubProfile.data
      });
    } catch (err) {
      this.setState({requestError: err.message})
    }
  }

  handleTwitterRequest= async (userName) => {
    try {
      const profile = await authAxios.get(`/show.json?screen_name=${userName}`);
      this.setState({
        twitterProfile: profile.data,
      });
      console.log(this.state.twitterProfile)
    } catch (err) {
      this.setState({
        requestError: err.message,
      });
    }
  }



  onPressDetailButton = async (userKey) => {
    
    console.log(this.state.userName)
    this.setState({
      selectedProfile: userKey,
    });
    var query = db.ref(`/users/${currentUser.uid}`).orderByChild('key').equalTo(userKey);
    query.once('value', (snapshot) => {
      let userName;
      let twitterUserName;
      let userNickName;
      snapshot.forEach((profile) => {
        console.log(profile.key + ': ' + profile.val().githubUserName)
        this.handleTwitterRequest(profile.val().twitterUserName)
        this.handleGitHubRequest(profile.val().githubUserName)
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
      this.handleModalVisible()
    });

    console.log(this.props.userProfile);
    console.log(this.state.twitterProfile)
  }
  onConfirmButtonPressed = () => {
    this.props.navigation.navigate('DetailedInformation', {twitterProfile: this.state.twitterProfile, gitHubProfile: this.state.gitHubProfile});
  }

  renderItem = ({item}) => (
    <ListItem
      title={item.nickname}
      titleStyle={{fontSize: 24}}
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
                justifyContent: 'space-around',
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

export default SavedProfilesList
