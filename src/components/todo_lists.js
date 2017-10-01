import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { getToken } from '../actions/login';

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

export default class TodoLists extends Component {
  componentDidMount() {
    const { FetchTodoLists, updateToken } = this.props;
    const { token } = this.props.loginReducer;
    const { Navigate } = this.props;

    if (token === null) {
      getToken().then((token) => {
        if (token) {
          updateToken(token);
          FetchTodoLists(token);
        } else {
          Navigate('Login');
        }
      });
    } else {
      FetchTodoLists(token);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Todo lists</Text>
      </View>
    );
  }
}
