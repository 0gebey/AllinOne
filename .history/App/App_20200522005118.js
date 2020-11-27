import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import styles from './Styles/NavigationStyles'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  // UserScreen: { screen: UserScreen },
  // SignUpScreen: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const AppContainer = createAppContainer(AppStack);



export default class App extends Component {
  render() {
    return (
      <AppStack
        screenProps={{ appName: 'AnotherExampleSE380' }}
      />
    )
  }
}
