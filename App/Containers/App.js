import React, { Component } from 'react'
import AppNavigation from '../Navigation/AppNavigation'
import { Provider } from 'react-redux'
import createStore from '../Redux'

const store = createStore()
console.disableYellowBox = true;
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