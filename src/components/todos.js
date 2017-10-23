import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { getToken } from '../actions/login';
import TodoItem from './todo_item';


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
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#414c59',
  },
});


class Todos extends Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    const { fetchTodos, updateToken } = this.props;
    const { token } = this.props.loginReducer;
    const { todoListId } = this.props.todosReducer;
    const { Navigate } = this.props;

    if (token === null) {
      getToken().then((tokenFromStorage) => {
        if (tokenFromStorage) {
          updateToken(tokenFromStorage);
          fetchTodos(todoListId);
        } else {
          Navigate('Login');
        }
      });
    } else {
      fetchTodos(todoListId);
    }
  }

  handleRefresh() {
    const { fetchTodos } = this.props;
    const { todoListId } = this.props.todosReducer;
    fetchTodos(todoListId);
  }

  render() {
    const { todos, loading } = this.props.todosReducer;
    const { todoListId } = this.props.todosReducer;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Create a todo'}
          returnKeyType={'go'}
          onChangeText={(text) => {
            this.props.updateTodoFormData({
              ...this.props.todosReducer.todoFormData,
              title: text,
            });
          }}
          value={this.props.todosReducer.todoFormData.title}
          onSubmitEditing={() => this.props.createTodo(
            todoListId,
            this.props.todosReducer.todoFormData,
          )}
        />
        <FlatList
          data={todos}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          onRefresh={this.handleRefresh}
          refreshing={loading}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              onPressItem={this.props.openTodo}
              onDeleteItem={this.props.deleteTodo}
              toggleCompletedTodo={this.props.toggleCompletedTodo}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}

Todos.propTypes = {
  fetchTodos: React.PropTypes.func.isRequired,
  updateToken: React.PropTypes.func.isRequired,
  Navigate: React.PropTypes.func.isRequired,
  updateTodoFormData: React.PropTypes.func.isRequired,
  createTodo: React.PropTypes.func.isRequired,
  loginReducer: React.PropTypes.shape({
    token: React.PropTypes.string,
  }).isRequired,
  todosReducer: React.PropTypes.shape({
    loading: React.PropTypes.boolean,
    todos: React.PropTypes.array.isRequired,
    todoFormData: React.PropTypes.shape({
      title: React.PropTypes.string,
    }),
  }).isRequired,
};


export default Todos;
