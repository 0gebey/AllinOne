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

export default class SavedProfilesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          savedProfiles: [],
          loading: false,
        };
      }

  componentDidMount() {
    db.ref(`/users/${currentUser.uid}`).once('value', function(snapshot) {
        var returnArray = [];
    
        snapshot.forEach(function(snap) {
            var item = snap.val();
            item.key = snap.key;
    
            returnArray.push(item);
        });
    
         this.setState({ savedProfiles: returnArray })
        return returnArray;  
        })
  }

//   renderItem({item}) {
//     return (
//         <ListItem item={item} />
//       )
//   }

//   renderList = () => {
//         if (this.state.loading) {
//           return (
//             <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
//               <ActivityIndicator size="large" color="dodgerblue" />
//             </View>
//           )
//         }
//         return (
//           <View style={styles.container}>
//             <FlatList
//               data={this.state.savedProfiles}
//               renderItem={this.renderItem}
//               keyExtractor={item => item.uid}
//             />
//           </View>
//         );
//       }
    
  

  render() {
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
            <KeyboardAvoidingView>
                {/* {this.renderList()} */}
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
