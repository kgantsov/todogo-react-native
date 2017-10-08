import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateToken, Navigate } from '../actions/login';
import {
  updateTodos,
  fetchTodos,
  updateTodoFormData,
  createTodo,
  deleteTodo,
} from '../actions/todos';
import Todos from '../components/todos';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  updateTodos,
  fetchTodos,
  updateToken,
  Navigate,
  updateTodoFormData,
  createTodo,
  deleteTodo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
