import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import UserScreen from './UserScreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppStack = createStackNavigator({
  LaunchScreen: {screen:LaunchScreen},
  UserScreen: {screen:UserScreen},
  ProfileScreen: {screen:ProfileScreen}, 
},
{headerMode: 'none'});

const AuthNavigator = createStackNavigator({
  LoginRoute: {screen: LoginScreen}, 

},{headerMode: 'none'});


const AppContainer = createSwitchNavigator(
  {
    AppStack: AppStack,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'Auth',
  }
);

export default createAppContainer(AppContainer)
  