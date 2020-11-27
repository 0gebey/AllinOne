import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, Linking, Alert} from 'react-native';
import { Header, Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/ProfileScreenStyle';
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';

const { currentUser } = auth();
const db = database()

class DetailedInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
                <View>
                  <Text style={styles.twitterInformation} > {"\n"} Twitter Informations:   </Text>
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
    userProfile: state.user.userProfile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedInformation)
