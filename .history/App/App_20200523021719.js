import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import UserScreen from './UserScreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  LaunchScreen: {screen:LoginScreen},
  UserScreen: {screen:UserScreen},
  ProfileScreen: {screen:ProfileScreen}, 
},
{headerMode: 'none'}
);

const AuthNavigator = createStackNavigator({
  LoginRoute: {
    screen: LoginScreen,
    navigationOptions: {
      headerMode: 'none'
    }
  }
});


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AppStack: AppStack,
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