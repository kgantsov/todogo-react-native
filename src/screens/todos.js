import React from 'react';
import { StyleSheet, View } from 'react-native';

import TodosContainer from '../containers/todos';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
  },
});


export default class TodosScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={styles.container}>
        <TodosContainer />
      </View>
    );
  }
}
