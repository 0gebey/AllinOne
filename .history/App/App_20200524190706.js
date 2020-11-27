import React, { Component } from 'react'
import Navigation from './Navigation'
import { Provider } from 'react-redux'
import createStore from './Redux'
import DebugConfig from './Config/DebugConfig'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App