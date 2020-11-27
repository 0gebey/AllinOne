import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
} from 'react-native';
import {Header, ListItem, List} from 'react-native-elements';
import styles from '../Styles/SavedScreenStyles';
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const {currentUser} = auth();
const db = database();
class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      gitHubUserName: '',
      twitterUserName: '',
      headerName: ''
    };
  }

  saveProfile = () => {
    const ref = db.ref(`/users/${currentUser.uid}`);
    if(currentUser != null) {
    var newKey = ref.push().key;
    var savedProfile = {
      key: newKey,
      nickname: this.state.nickname,
      githubUserName: this.state.gitHubUserName,
      twitterUserName: this.state.twitterUserName,
    };
    ref.push(savedProfile).then((res) => {

      console.log('address key = ' + res.key);
    });
    this.props.navigation.navigate({routeName: 'SavedProfilesList'});
  };
}
  componentDidMount() {
      if (currentUser == null) {
        this.setState({
          headerName: 'User Screen',
        });
      } else {
        this.setState({headerName: currentUser.displayName});
      }
    }
  

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
                }}
              />
              <Image style={styles.logo} source={Images.ieuLogo} />
              <Text style={styles.createProfileText}>Create a Profile</Text>

              <View
                style={{
                  flex: 1,
                  alignItem: 'center',
                  justifyContent: 'space-between',
                  padding: 5,
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text style={{paddingTop: 10, fontSize: 16, color: '#fff'}}>
                  User Name(Nickname):
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({nickname: text})}
                  placeholder="User Nick Name"
                  placeholderTextColor={'rgba(255, 255, 255, 0.5)'}></TextInput>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItem: 'center',
                  justifyContent: 'space-between',
                  padding: 5,
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 16,
                    color: '#fff',
                    paddingRight: 22,
                  }}>
                  User Name(Twitter):
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) =>
                    this.setState({twitterUserName: text})
                  }
                  placeholder="User Twitter Name"
                  placeholderTextColor={'rgba(255, 255, 255, 0.5)'}></TextInput>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItem: 'center',
                  justifyContent: 'space-between',
                  padding: 5,
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 16,
                    color: '#fff',
                    paddingRight: 22,
                  }}>
                  User Name(GitHub):
                </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({gitHubUserName: text})}
                  placeholder="User GitHub Name"
                  placeholderTextColor={'rgba(255, 255, 255, 0.5)'}></TextInput>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => this.saveProfile()}>
                  <Text style={styles.profileButtonText}> Create Profile </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
export default SavedScreen;
