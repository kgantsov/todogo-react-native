import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import TodoListsContainer from '../containers/todo_lists';

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


export default class TodoListsScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.logoContainer}>
        </View>
        <View style={styles.formContainer}>
          <TodoListsContainer />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
