import React, { Component } from 'react'
import Navigation from './Navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ReduxThunk from 'redux-thunk';



class App extends Component {
  render () {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Navigation />
      </Provider>
    )
  }
}
export default App