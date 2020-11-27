import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, Linking, Alert} from 'react-native';
import { Header, Avatar, ListItem } from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/ProfileScreenStyle';
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';

const { currentUser } = auth();
const db = database()

class ProfileTwitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
         twitterProfile: this.props.navigation.state.params.twitterProfile,
    }
  }

  goToProfile = () => {
    console.log(this.props.twitterProfile)
    Linking.canOpenURL(this.props.twitterProfile.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.twitterProfile.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.twitterProfile.url);
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

              <View>
                <Image style={styles.logo1} source={Images.ieuLogo} />
              </View>
              <View style= {styles.profileContainer}>
                <View style={styles.viewStyle}>
                <Avatar
                      rounded
                      size= "xlarge"
                      source={{
                        uri:
                          this.props.twitterProfile.profile_image_url
                      }}
                      showEditButton
                      
                    />
                  <Text style={styles.subtitleText} > {this.props.twitterProfile.name}</Text>
                  <Text style={styles.bioText} > {this.props.twitterProfile.description} - {this.props.twitterProfile.location}</Text>
                  
                </View>
                <View style={styles.listContainer} >
                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Followers: {this.props.twitterProfile.followers_count} {"\n"}
                    </Text>

                    <Text style={styles.listText}>Friends: {this.props.twitterProfile.friends_count} {"\n"}
                    </Text>
                  </View>

                  <View style={styles.listStyle}>
                    <Text style={styles.listText}>Favorites: {this.props.twitterProfile.favorites_count} {"\n"}
                    </Text>
                    <Text style={styles.listText}>Created At: {this.props.twitterProfile.created_at} {"\n"}
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


export default ProfileTwitter
