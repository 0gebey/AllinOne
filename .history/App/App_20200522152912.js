import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import styles from './Styles/NavigationStyles'

import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  // UserScreen: { screen: UserScreen },
  // SignUpScreen: { screen: SignUpScreen },
  LaunchScreen: { screen: LaunchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const AuthNavigator = createStackNavigator({
  LoginRoute: {screen: LoginScreen},
  UserScreen: {screen: UserScreen}}, {
    headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
  });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'App',
  }
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
