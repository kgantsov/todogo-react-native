import React from 'react';
import { StyleSheet, View } from 'react-native';

import TodoContainer from '../containers/todo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
  },
});


export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'TODO',
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoContainer />
      </View>
    );
  }
}
