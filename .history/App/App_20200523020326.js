import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import UserScreen from './UserScreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  Launch: LaunchScreen,

});

const AuthNavigator = createStackNavigator({
  LoginRoute: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null
    })
  }
});


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
        screenProps={{ appName: 'Coding with Curry' }}
      />
    )
  }
}