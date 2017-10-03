import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getToken } from '../actions/login';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    paddingTop: 22,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default class TodoLists extends Component {
  componentDidMount() {
    const { FetchTodoLists, updateToken } = this.props;
    const { token } = this.props.loginReducer;
    const { Navigate } = this.props;

    this.handleRefresh = this.handleRefresh.bind(this);

    console.log('........', token, this.props, this.props.todosReducer.todoLists);
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

  handleRefresh() {
    const { FetchTodoLists } = this.props;
    const { token } = this.props.loginReducer;
    FetchTodoLists(token);
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  }

  render() {
    const { todoLists, loading } = this.props.todosReducer;

    return (
      <View style={styles.container}>
        <View><Text>Todos list</Text></View>
        <FlatList
          data={todoLists}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={loading}
          renderItem={({ item }) => <Text key={item.id} style={styles.item}>{item.title}</Text>}
        />
      </View>
    );
  }
}
