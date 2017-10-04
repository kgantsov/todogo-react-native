import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    padding: 10,
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

class Login extends Component {
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
            this.props.Login(
              this.props.loginReducer.loginForm.email,
              this.props.loginReducer.loginForm.password,
            ).then(() => {
            });
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.propTypes = {
  changeLoginFormData: React.PropTypes.func.isRequired,
  Login: React.PropTypes.func.isRequired,
  loginReducer: React.PropTypes.shape({
    token: React.PropTypes.string.isRequired,
    loginForm: React.PropTypes.shape({
      email: React.PropTypes.string.isRequired,
      password: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};


export default Login;
