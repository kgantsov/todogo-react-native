import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateToken, Navigate } from '../actions/login';
import {
  updateTodos,
  fetchTodos,
  updateTodo,
  saveTodo,
  createTodo,
  openTodo,
  toggleCompletedTodo,
  deleteTodo,
} from '../actions/todos';
import Todo from '../components/todo';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  updateTodos,
  fetchTodos,
  updateToken,
  Navigate,
  updateTodo,
  saveTodo,
  createTodo,
  openTodo,
  toggleCompletedTodo,
  deleteTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
