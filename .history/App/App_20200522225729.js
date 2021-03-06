import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ProfileScreen from './ProfileScreen';
import styles from './Styles/NavigationStyles'

import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  // UserScreen: { screen: UserScreen },
  // SignUpScreen: { screen: SignUpScreen },
  Launch: LaunchScreen,
  // User: UserScreen,
  // Profile: ProfileScreen 
}, {
  // Default config for all screens
 //def headerMode: 'none',7
 headerMode: 'none',
 initialRouteName: 'Launch',
})

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
headerMode: 'none',
navigationOptions: {
  initialRouteName: 'App',
     } }
));

export default class App extends Component {
  render() {
    return (
      <AppContainer
        screenProps={{ appName: 'AnotherExampleSE380' }}
      />
    )
  }
}
