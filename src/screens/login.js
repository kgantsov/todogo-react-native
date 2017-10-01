import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import LoginContainer from '../containers/login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
  },
  formContainer: {
    flex: 1,
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class LoginScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.logoContainer}>
        </View>
        <View style={styles.formContainer}>
          <LoginContainer />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
