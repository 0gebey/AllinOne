import Navigator from './Navigator'

import React, { Component } from 'react';

class App extends Component {
  render () {
    return (
        <Navigator
        screenProps={{ appName: 'AnotherExampleSE380' }}
      />
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default App
