import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  TouchableOpacity

} from 'react-native';
import { Button, Text,  } from 'react-native-elements'
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Images }  from './Themes/Images'
import styles from './Styles/AuthFormStyles'
import Icon from 'react-native-vector-icons/Ionicons';

const AuthForm = (props) => {

  displayNameInput = (
    <View>
      <TextInput
        style={styles.formInput}
        onChangeText={text => props.setFieldValue('displayName', text)}
        placeholder='Display Name'
      />
      <Text style={styles.validationText}>{props.errors.displayName}</Text>
    </View>
  );

  return (
    <ImageBackground source = {Images.ieuLogo} style = {styles.backgroundContainer}>
        <SafeAreaView style= {styles.scrollContainer}>
            <ScrollView style = {styles.mainContainer}>
                <KeyboardAvoidingView>
        <Image style= {styles.logo} source = {Images.ieuLogo}/>
    <View style={styles.viewStyle}>
      <Text style={styles.subtitleText}>Please Login Before Start</Text>
      {props.authMode === 'signup' ? displayNameInput : null}
      <View>
      <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        onChangeText={text => props.setFieldValue('email', text)}
        placeholder='email'
      />
      <Text style={styles.validationText}> {props.errors.email}</Text>
      </View>
      <View>
      <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
        placeholder='password'
      />
      <Text style={styles.validationText}> {props.errors.password}</Text>
      <TouchableOpacity style={styles.btnEye}
                    onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
                  </TouchableOpacity>
      </View>
      <TouchhableOpacity
        onPress={() => props.handleSubmit()}
        buttonStyle={styles.loginButton}>
            <Text>{props.authMode === 'login' ? 'Login' : 'Create Account'}</Text>
        </TouchhableOpacity>
      <Button
        backgroundColor='transparent'
        color='black'
        buttonStyle={styles.switchButton}
        onPress={() => props.switchAuthMode()}
        title={props.authMode === 'login' ? 'Switch to Signup' : 'Switch to Login'} />
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