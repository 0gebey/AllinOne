import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ProfileScreen from './ProfileScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  UserScreen: UserScreen,
  ProfileScreen: ProfileScreen, 
} ,{
  headerMode: 'none'
});

const AuthNavigator = createStackNavigator({
    LaunchScreen: LaunchScreen,
    LoginScreen: LoginScreen,
  },{
  headerMode: 'none',
  navigationOptions: {
    initialRouteName: 'LaunchScreen',  
   }
  })



const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthNavigator
  },
  {
    navigationOptions: {
      initialRouteName: 'LaunchScreen',  
     }
  }
));

export default class App extends Component {
  render() {
    return (
      <AppContainer
      />
    )
  }
}
