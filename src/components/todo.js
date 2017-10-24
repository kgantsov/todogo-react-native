import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { getToken } from '../actions/login';
import DateTimePicker from 'react-native-osd-datetimepicker';


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
  textarea: {
    padding: 10,
    height: 150,
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


class Todo extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Title'}
          returnKeyType={'go'}
          onChangeText={(text) => {
            this.props.updateTodo({
              ...this.props.todosReducer.todo,
              title: text,
            });
          }}
          value={this.props.todosReducer.todo.title}
        />
        <TextInput
          style={styles.textarea}
          placeholder={'Note...'}
          returnKeyType={'go'}
          multiline={true}
          onChangeText={(text) => {
            this.props.updateTodo({
              ...this.props.todosReducer.todo,
              note: text,
            });
          }}
          value={this.props.todosReducer.todo.note}
        />
        <DateTimePicker
          date={this.props.todosReducer.todo.dead_line_at}
          onChange={(value) => {
            this.props.updateTodo({
              ...this.props.todosReducer.todo,
              dead_line_at: new Date(Date.parse(value)),
            });
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.props.saveTodo(this.props.todosReducer.todo);
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Todo.propTypes = {
  fetchTodos: React.PropTypes.func.isRequired,
  saveTodo: React.PropTypes.func.isRequired,
  updateToken: React.PropTypes.func.isRequired,
  Navigate: React.PropTypes.func,
  updateTodo: React.PropTypes.func.isRequired,
  loginReducer: React.PropTypes.shape({
    token: React.PropTypes.string,
  }).isRequired,
  todosReducer: React.PropTypes.shape({
    todoListId: React.PropTypes.string.isRequired,
    loading: React.PropTypes.boolean,
    todos: React.PropTypes.array.isRequired,
    todo: React.PropTypes.shape({
      title: React.PropTypes.string,
      priority: React.PropTypes.number,
      note: React.PropTypes.string,
    }),
  }).isRequired,
};


export default Todo;
