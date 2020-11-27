import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Image
} from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import {View} from 'react-native-animatable';
import {Images} from '../Themes';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem, List} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import shortid from 'shortid'
import styles from '../Styles/SavedProfilesListStyles';

const {currentUser} = auth();
const db = database();

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

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
           id: shortid.generate(),
           nickname: child.val().nickname,
           twitterName: child.val().twitterUserName,
           githubUserName: child.val().githubUserName,
 
        });
     });
 
     this.setState({ savedProfiles: savedProfilesArray});
     console.log(this.state.savedProfiles)
    });
  }

  renderItem = ({ item }) => (
    <ListItem
    title={item.nickname}
    // leftAvatar={{ source: { uri: this.props.userProfile.avatar_url } }}
    bottomDivider
    chevron
    // button onPress={() => this.handleModalVisible()}
    style= {{paddingTop: 10,borderBottomWidth:1}}
     />
)


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
                    width: '100%'
                  }}
                />
                <Image style={styles.logo} source={Images.ieuLogo} />
                <View stlye = { styles.listStyle}>
            <FlatList
      keyExtractor={(item) => item.id}
      data={this.state.savedProfiles}
      renderItem={this.renderItem}
    />
    
    </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      );
    }
}
