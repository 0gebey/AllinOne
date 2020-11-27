import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from 'react-native';
import Navigator from './Navigator';

class App extends Component {
  render () {
    return (
        <Navigator
      />
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default App
