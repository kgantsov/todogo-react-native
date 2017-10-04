import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, Text, View } from 'react-native';
import { getToken } from '../actions/login';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    paddingTop: 22,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#414c59',
  },
});

class TodoLists extends Component {
  componentDidMount() {
    const { FetchTodoLists, updateToken } = this.props;
    const { token } = this.props.loginReducer;
    const { Navigate } = this.props;

    this.handleRefresh = this.handleRefresh.bind(this);

    if (token === null) {
      getToken().then((tokenFromStorage) => {
        if (tokenFromStorage) {
          updateToken(tokenFromStorage);
          FetchTodoLists(tokenFromStorage);
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

  render() {
    const { todoLists, loading } = this.props.todosReducer;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Create a todo list'}
          returnKeyType={'go'}
          onChangeText={(text) => {
            this.props.updateTodoListFormData({
              ...this.props.todosReducer.todoListFormData,
              title: text,
            });
          }}
          value={this.props.todosReducer.todoListFormData.title}
          onSubmitEditing={() => this.props.CreateTodoList(
            this.props.loginReducer.token,
            this.props.todosReducer.todoListFormData,
          )}
        />
        <FlatList
          data={todoLists}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          onRefresh={this.handleRefresh}
          refreshing={loading}
          renderItem={({ item }) => (
            <Text key={`todo_list_${item.id}`} style={styles.item}>{item.title}</Text>
          )}
        />
      </View>
    );
  }
}

TodoLists.propTypes = {
  FetchTodoLists: React.PropTypes.func.isRequired,
  updateToken: React.PropTypes.func.isRequired,
  Navigate: React.PropTypes.func.isRequired,
  updateTodoListFormData: React.PropTypes.func.isRequired,
  CreateTodoList: React.PropTypes.func.isRequired,
  loginReducer: React.PropTypes.shape({
    token: React.PropTypes.string,
  }).isRequired,
  todosReducer: React.PropTypes.shape({
    loading: React.PropTypes.boolean,
    todoLists: React.PropTypes.array.isRequired,
    todoListFormData: React.PropTypes.shape({
      title: React.PropTypes.string,
    }),
  }).isRequired,
};


export default TodoLists;
