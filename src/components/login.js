import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    padding: 10,
    // width: 250,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(text) => {
            this.props.changeLoginFormData({
              ...this.props.loginReducer.loginForm,
              email: text,
            });
          }}
          onSubmitEditing={() => this.passwordInput.focus()}
          value={this.props.loginReducer.loginForm.email}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          returnKeyType={'go'}
          onChangeText={(text) => {
            this.props.changeLoginFormData({
              ...this.props.loginReducer.loginForm,
              password: text,
            });
          }}
          ref={(input) => { this.passwordInput = input; }}
          value={this.props.loginReducer.loginForm.password}
          onSubmitEditing={() => this.props.Login(
            this.props.loginReducer.loginForm.email,
            this.props.loginReducer.loginForm.password,
          )}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log('+++_____+++');
            this.props.Login(
              this.props.loginReducer.loginForm.email,
              this.props.loginReducer.loginForm.password,
            ).then(() => {
              console.log('<<<<<<>>>>>');
            });
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
