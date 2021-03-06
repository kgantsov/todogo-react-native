import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { getToken } from '../actions/login';
import TodoListItem from './todo_list_item';


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


class TodoLists extends Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
  }
  componentDidMount() {
    const { FetchTodoLists, updateToken } = this.props;
    const { token } = this.props.loginReducer;
    const { Navigate } = this.props;

    if (token === null) {
      getToken().then((tokenFromStorage) => {
        if (tokenFromStorage) {
          updateToken(tokenFromStorage);
          FetchTodoLists();
        } else {
          Navigate('Login');
        }
      });
    } else {
      FetchTodoLists();
    }
  }

  handleRefresh() {
    const { FetchTodoLists } = this.props;
    FetchTodoLists();
  }

  render() {
    const { todoLists, loading } = this.props.todoListsReducer;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Create a todo list'}
          returnKeyType={'go'}
          onChangeText={(text) => {
            this.props.updateTodoListFormData({
              ...this.props.todoListsReducer.todoListFormData,
              title: text,
            });
          }}
          value={this.props.todoListsReducer.todoListFormData.title}
          onSubmitEditing={() => this.props.CreateTodoList(
            this.props.todoListsReducer.todoListFormData,
          )}
        />
        <FlatList
          data={todoLists}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          onRefresh={this.handleRefresh}
          refreshing={loading}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoListItem
              onPressItem={this.props.openTodoList}
              onDeleteItem={this.props.deleteTodoList}
              {...item}
            />
          )}
        />
      </View>
    );
  }
}

TodoLists.propTypes = {
  FetchTodoLists: React.PropTypes.func.isRequired,
  updateToken: React.PropTypes.func.isRequired,
  openTodoList: React.PropTypes.func.isRequired,
  deleteTodoList: React.PropTypes.func.isRequired,
  Navigate: React.PropTypes.func,
  updateTodoListFormData: React.PropTypes.func.isRequired,
  CreateTodoList: React.PropTypes.func.isRequired,
  loginReducer: React.PropTypes.shape({
    token: React.PropTypes.string,
  }).isRequired,
  todoListsReducer: React.PropTypes.shape({
    loading: React.PropTypes.boolean,
    todoLists: React.PropTypes.array.isRequired,
    todoListFormData: React.PropTypes.shape({
      title: React.PropTypes.string,
    }),
  }).isRequired,
};


export default TodoLists;
