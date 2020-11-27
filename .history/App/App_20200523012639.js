import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ProfileScreen from './ProfileScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  UserScreen: UserScreen,
  ProfileScreen: ProfileScreen, 
} ,{
  headerMode: 'none'
});

const AuthNavigator = createStackNavigator({
    LoginScreen: LoginScreen,
    LaunchScreen: LaunchScreen,}
  ,  {
  headerMode: 'none',
  })



const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth',
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
