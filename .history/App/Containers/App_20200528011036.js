import React, { Component } from 'react'
import AppNavigation from '../Navigation/AppNavigation'
import { Provider } from 'react-redux'
import createStore from '../Redux'
import DebugConfig from '../Config/DebugConfig'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}
export default App;