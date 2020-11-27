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
import shortid from 'shortid';
import styles from '../Styles/SavedProfilesListStyles';

const {currentUser} = auth();
const db = database();

export default class SavedProfilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfiles: [],
      loading: false,
      selectedProfile: null,
      buttons: ['GitHub', 'Twitter'],
    };
  }

  componentDidMount() {
    db.ref(`/users/${currentUser.uid}`).on('value', async (snapshot) => {
      var savedProfilesArray = [];
      //   let data = await snapshot.val();
      //   let keys = Object.keys(data);
      //   keys.forEach((key) => {
      //     savedProfiles.push(data[key]);
      //   });
      //   console.log(savedProfiles);
      //   this.setState({savedProfiles: savedProfiles}),
      //     console.log(this.state.savedProfiles);
      snapshot.forEach((child) => {
        savedProfilesArray.push({
          id: shortid.generate(),
          nickname: child.val().nickname,
          twitterName: child.val().twitterUserName,
          githubUserName: child.val().githubUserName,
        });
      });

      this.setState({savedProfiles: savedProfilesArray});
      console.log(this.state.savedProfiles);
    });
  }

  handleDetailButton(id) {
    this.setState({
      selectedProfile: id,
    })
    this.props.navigation.navigate({routeName: 'DetailedInformation'}, {userID: id});
    console.log(this.state.selectedProfile)
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
      onPress={
        (() => this.handleDetailButton(item.id)
        )
      }
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
                  keyExtractor={(item) => item.id}
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
