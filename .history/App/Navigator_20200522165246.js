import React, { Component } from 'react';

import LaunchScreen from './LaunchScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ProfileScreen from './ProfileScreen';
import styles from './Styles/NavigationStyles'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
 headerMode: 'none',
 initialRouteName: 'LaunchScreen'
})


const secondaryNav = createStackNavigator({
  UserScreen: { screen: UserScreen},
  ProfileScreen: { screen: ProfileScreen },
}, {
headerMode: 'none',
navigationOptions: {
initialRouteName: 'PrimaryNav',    
 }
})



const mergeNav = createAppContainer({

    PrimaryNav: {screen: PrimaryNav},
    secondaryNav: {screen: secondaryNav},
    
   },{
     headerMode: 'none',
   })
