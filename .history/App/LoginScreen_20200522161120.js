import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { login, signup, subscribeToAuthChanges } from './AuthForm';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authMode: 'login',
      press: false,
      showPass: true,

    }
  }

  showPassHandle = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true})
    } else {
      this.setState({ showPass: true, press: false})
    }
  }

  componentDidMount() {
    subscribeToAuthChanges(this.onAuthStateChanged)
  }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      this.props.navigation.navigate({routeName: 'Auth'});
    }
  }

  switchAuthMode = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  }

  render() {
    return (
      <AuthForm
        login={login}
        signup={signup}
        authMode={this.state.authMode}
        switchAuthMode={this.switchAuthMode}
        // press={this.state.press}
        // showPass={this.state.showPass}
        // showPassHandle={this.showPassHandle.bind(this)}
      />
    );
  }
}


export default LoginScreen;