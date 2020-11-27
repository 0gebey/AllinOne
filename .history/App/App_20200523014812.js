import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ProfileScreen from './ProfileScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  LaunchScreen: LaunchScreen,
  UserScreen: UserScreen,
  ProfileScreen: ProfileScreen, 
} ,{
  headerMode: 'none'
});

const AuthNavigator = createStackNavigator({
    LoginRoute: {
    screen:LoginScreen,
    navigationOptions: () => ({
      headerMode: 'none',
    })
  }}
 )



const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthNavigator
  },
  {
    navigationOptions: {
      initialRouteName: 'Auth',  
     }
  }
));

class App extends Component {
  render() {
    return (
      <AppContainer
      />
    )
  }
}

export default App;
