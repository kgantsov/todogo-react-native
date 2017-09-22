import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import store from './src/store.js';
import LoginContainer from './src/containers/login.js';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
          <View style={styles.logoContainer}>
          </View>
          <View style={styles.formContainer}>
            <LoginContainer />
          </View>
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

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
  }
});
