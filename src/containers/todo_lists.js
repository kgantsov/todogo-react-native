import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateToken, Navigate } from '../actions/login';
import {
  updateTodoLists,
  FetchTodoLists,
  updateTodoListFormData,
  CreateTodoList,
 } from '../actions/todo_lists';
import TodoLists from '../components/todo_lists';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  updateTodoLists,
  FetchTodoLists,
  updateToken,
  Navigate,
  updateTodoListFormData,
  CreateTodoList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
