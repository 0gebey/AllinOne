import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem, List} from 'react-native-elements';
import styles from '../Styles/LaunchScreenStyles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const {currentUser} = auth();
const db = database();

export default class SavedProfilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProfiles: [],
      loading: false,
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
           id: child.val().key,
           nickname: child.val().nickname,
           twitterName: child.val().twitterUserName,
           githubUserName: child.val().githubUserName,
 
        });
     });
 
     this.setState({ savedProfiles: savedProfilesArray});
     console.log(this.state.savedProfiles)
    });
  }

  //   renderItem({item}) {
  //     return (
  //         <ListItem item={item} />
  //       )
  //   }

  renderList = () => {
    return (
      <List>
        <FlatList
          data={this.state.savedProfiles}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item}) => (
            <ListItem
              name={<Text>{item.nickname}</Text>}
              twitterName={<Text>{item.twitterName}</Text>}
              gitHubName={<Text>{item.githubUserName}</Text>}
            />
          )}
        />
      </List>
    );
  };

  render() {
      const profilesArray = Object.values(this.state.savedProfiles)
    return (
      <ImageBackground
        source={Images.background}
        style={styles.backgroundContainer}>
        <SafeAreaView style={styles.scrollContainer}>
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
          <ScrollView style={styles.mainContainer}>
          <List>
        <FlatList
          data={this.state.savedProfiles}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item}) => (
            <ListItem
              name={<Text>{item.nickname}</Text>}
              twitterName={<Text>{item.twitterName}</Text>}
              gitHubName={<Text>{item.githubUserName}</Text>}
            />
          )}
        />
      </List>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
