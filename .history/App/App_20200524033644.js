import React, { Component } from 'react'
import Navigation from './Navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider>
        <Navigation />
      </Provider>
    )
  }
}
export default App