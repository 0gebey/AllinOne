import React from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  TouchableOpacity,


} from 'react-native';
import { Text } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Images } from './Themes';
import styles from './Styles/AuthFormStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '@react-native-firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from 'react-navigation';
//import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';

export function login({ email, password }) {
        auth().signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value))
  }
  
  export function signup({ email, password, displayName }) {
        auth().createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo)
        userInfo.user.updateProfile({ displayName: displayName.trim() })
          .then(() => { })
      })
  }
  
  export function subscribeToAuthChanges(authStateChanged) {
        auth().onAuthStateChanged((user) => {
      authStateChanged(user);
    })
  }
  
  export function signout(onSignedOut) {
        auth().signOut()
      .then(() => {
        onSignedOut();
      })
  }

  // showPass = () => {
  //   if (this.state.press == false) {
  //     this.setState({ showPass: false, press: true})
  //   } else {
  //     this.setState({ showPass: true, press: false})
  //   }
  // }



const AuthForm = (props) => {

  // state = {
  //   showPass: true,
  //   press: false,
  // }

  displayNameInput = (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder='Display Name'
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
    <ImageBackground source = {Images.loginbackground} style = {styles.backgroundContainer}>
        <SafeAreaView style= {styles.scrollContainer}>
            <ScrollView style = {styles.mainContainer}>
        <KeyboardAvoidingView>
        <Image style= {styles.logo} source = {Images.ieuLogo}/>
    <View style={styles.viewStyle}>
      <Text style={styles.subtitleText}>Please Login Before Start</Text>
      {props.authMode === 'signup' ? displayNameInput : null}
      <View>
      <Icon name="rocket" size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder='E-Mail'
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      </View>
      <View>
      <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder='Password'
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      {/* <TouchableOpacity style={styles.btnEye}
                     onPress={this.showPass.bind(this)}
                    >
                    <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
                  </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.loginButton}
        style = {styles.loginButton}>
            <Text style = { styles.loginButtonText}>{props.authMode === 'login' ? 'Login' : 'Create Account'}</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style = { styles.loginButton}
        onPress={() => props.switchAuthMode()}
        >
        <Text style = { styles.loginButtonText}>{props.authMode === 'login' ? 'Switch to Signup' : 'Switch to Login'}</Text>
      </TouchableOpacity>
    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    </ImageBackground>
  );
}


export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '', displayName: '' }),
  validationSchema: (props) => yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
    displayName: props.authMode === 'signup' ?
      yup.string().min(5).required() : null
  }),
  handleSubmit: (values, { props }) => {
    props.authMode === 'login' ? props.login(values) : props.signup(values)
  },
})(AuthForm);