import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, Linking, Alert} from 'react-native';
import { Header, Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/DetailedInformationStyles';
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';
import UserActions from '../Redux/UserRedux';
import TwitterActions from '../Redux/TwitterRedux';

const { currentUser } = auth();
const db = database()
const ref = db.ref(`/users/${currentUser.uid}`);
class DetailedInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userKey: this.props.navigation.state.params.userKey,
        userName: '',
        error: null,
        isNameTrue: null,
        userFailed: null,
        isTwitterNameTrue: null,
        twitterFailed: null,
        userTwitterName: '',
    }
  }

  goToProfile = () => {
    console.log(this.props.userProfile)
    Linking.canOpenURL(this.props.userProfile.html_url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.userProfile.html_url);
      } else {
        console.log("Don't know how to open URI: " + this.props.userProfile.html_url);
      }
    });
  };

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

  componentDidMount() {
    var query = ref.orderByChild("key").equalTo(this.state.userKey);
    query.once("value", function(snapshot) {
      snapshot.forEach(function(message) {
        console.log(message.key+": "+message.val().nickname);

      });
    });
    this.props.userRequest(this.state.userName);
    }
  

  render() {

    return (

      <ImageBackground source={Images.background} style={styles.backgroundContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView style={styles.scrollContainer}>
            <Header style={styles.containerStyle}
              leftComponent={{ icon: 'arrow-back', size: 24, color: '#fff', onPress: () => this.props.navigation.goBack() }}
              centerComponent={{ text: currentUser.displayName, style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.props.navigation.navigate({ routeName: 'LaunchScreen' }) }}
              containerStyle={{
                backgroundColor: '#432577',
                marginTop: -25,
                width: '100%'
              }}
            />
            <KeyboardAvoidingView>
              <View style= {styles.profileContainer}>
                <View style={styles.viewStyle}>
                <Avatar
                      rounded
                      size= "xlarge"
                      source={{
                        uri:
                          this.props.userProfile.avatar_url
                      }}
                      showEditButton
                      
                    />
                  <Text style={styles.subtitleText} > {this.props.userProfile.name}</Text>
                  <Text style={styles.bioText} > {this.props.userProfile.bio} - {this.props.userProfile.location} {"\n"} GitHub Informations:   </Text>
                  
                </View>
                <View style={styles.listContainer} >
                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Followers: {this.props.userKey} {"\n"}
                    </Text>

                    <Text style={styles.listText}>Following: {this.props.userProfile.following} {"\n"}
                    </Text>
                  </View>

                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Public Repos: {this.props.userProfile.public_repos} {"\n"}
                    </Text>
                    <Text style={styles.listText}>Public Gists: {this.props.userProfile.public_gists} {"\n"}
                    </Text>
                    
                  </View>
                </View> 
                <View>
                  <Text style={styles.twitterInformation} > {"\n"} Twitter Informations:   </Text>
                  </View>
                  <View style={styles.listContainer} >
                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Followers: {this.props.userProfile.followers} {"\n"}
                    </Text>

                    <Text style={styles.listText}>Following: {this.props.userProfile.following} {"\n"}
                    </Text>
                  </View>

                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Public Repos: {this.props.userProfile.public_repos} {"\n"}
                    </Text>
                    <Text style={styles.listText}>Public Gists: {this.props.userProfile.public_gists} {"\n"}
                    </Text>
                    
                  </View>
                </View> 
               
                <TouchableOpacity style = {styles.profileButton} onPress={() => this.goToProfile()}>
                  <Text style= {styles.profileButtonText}> SEE PROFILE </Text>
                </TouchableOpacity>
              </View>

            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedInformation)
