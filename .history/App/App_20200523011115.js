import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import styles from './Styles/NavigationStyles'

import { createAppContainer, createSwitchNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  Launch: LaunchScreen,
  User: UserScreen, 
}, {

 headerMode: 'none',
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
  initialRouteName: 'Auth',
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
