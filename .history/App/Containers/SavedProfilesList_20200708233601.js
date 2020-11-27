import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList
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
const uid = item.uid;

export default class SavedProfilesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          savedProfiles: [],
          loading: false,
        };
      }

  componentDidMount(){
    db.ref(`/users/${currentUser.uid}`).on('value', (snapshot) => {
        const savedProfiles = _.map(snapshot.val(), (uid) => {
            return {uid}
          });
          this.setState({savedProfiles, loading: false})
        })
  }

  renderItem({item}) {
    return (
        <ListItem item={item} />
      )
  }

  renderList = () => {

  }

  render() {
    if (this.state.loading) {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.savedProfiles}
            renderItem={this.renderItem}
            keyExtractor={item => item.uid}
          />
        </View>
      );
  }
}
