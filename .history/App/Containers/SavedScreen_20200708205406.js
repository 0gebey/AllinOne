import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, ImageBackground, FlatList, TextInput } from 'react-native'
import { Header, ListItem, List } from 'react-native-elements'
import styles from '../Styles/SavedScreenStyles'
import { View } from 'react-native-animatable';
import { Images } from '../Themes';
import { SafeAreaView } from 'react-navigation';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import SavedProfilesComponent from './SavedProfilesComponent';

const { currentUser } = auth();
const db = database()
class SavedScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        profiles: [],

        }
      }

    componentDidMount() {
        this.fecthProfileInfos();
      
    }
    _renderItem = ({ item }) => (

      <View style={{flex: 1}}>
          <Text>{item}</Text>
      </View> );

    fecthProfileInfos= () => {
      // db.ref(`/users/${currentUser.uid}/`).on('value', querySnapShot => {
      //   let data = querySnapShot.val() ? querySnapShot.val() : {};
      //   let profileInfos = {...data};
      //   this.setState({
      //     profiles: profileInfos,
      //   });
      //   console.log(this.state.profiles)
      // })
    //   db
    //  .ref(`/users/${currentUser.uid}/`)
    //  .once('value')
    //  .then(snapshot => {
    //  this.setState({profiles: snapshot.val() })
    //  })
    var data1 = [];
    var that = this;
    var fireBaseResponse = db.ref(`/users/${currentUser.uid}/`);
    fireBaseResponse.once('value', snapshot =>{
      snapshot.forEach(function(data) {
        var temp = data.val();
        temp["key"] = data.key;
        data1.push(temp);
    })
   }) .then(function() {
      console.log(data1)
      var result = data1.map(user => 
        ({id: user.id, text: user.name , repos: user.repos,
          followers: user.followers , following: user.following,
          gists: user.gists }));
        console.log(result)
      // that.setState({
      //   profiles: result
      // })
      console.log(that.state.profiles)
   });

  
    }

    render() { 
        return (
         
          <ImageBackground source={Images.background} style={styles.backgroundContainer}>
            <SafeAreaView style={styles.scrollContainer}>
              <ScrollView style={styles.mainContainer}>
                <Header style={styles.containerStyle}
                  leftComponent={{ icon: 'arrow-back', size: 24, color: '#fff', onPress: () => this.props.navigation.goBack() }}
                  centerComponent={{ text: currentUser.displayName, style: { color: '#fff' } }}
                  rightComponent={{ icon: 'home', color: '#fff', onPress: () => this.props.navigation.navigate({ routeName: 'LaunchScreen' }) }}
                  containerStyle={{
                    backgroundColor: '#432577',
                    marginTop: -25
                  }}
                />
                 <Image style={styles.logo} source={Images.ieuLogo} />
                 <Text style= {styles.createProfileText}>Create a Profile</Text>
                <KeyboardAvoidingView style={{flex:1}}>
                  <View style={{flex:1, alignItem: 'center' , justifyContent: 'space-between' , padding:5 ,flexDirection: 'row', width: '100%'}}>
                  <Text style= {{paddingTop: 10, fontSize: 16}}>User Name(Nickname):</Text>
                  <TextInput style= {styles.textInput}></TextInput>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </SafeAreaView>
          </ImageBackground>
        )
      }
    }
export default SavedScreen;
