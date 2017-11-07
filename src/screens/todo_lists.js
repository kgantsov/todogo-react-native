import React from 'react';
import { StyleSheet, View } from 'react-native';

import TodoListsContainer from '../containers/todo_lists';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
  },
});


export default class TodoListsScreen extends React.Component {
  static navigationOptions = {
    title: 'TODO lists',
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoListsContainer />
      </View>
    );
  }
}
