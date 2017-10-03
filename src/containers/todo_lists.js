import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateToken, Navigate } from '../actions/login';
import { updateTodoLists, FetchTodoLists } from '../actions/todo_lists';
import TodoLists from '../components/todo_lists';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  updateTodoLists,
  FetchTodoLists,
  updateToken,
  Navigate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoLists);
