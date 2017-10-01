import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateToken } from '../actions/login';
import { updateTodoLists, FetchTodoLists } from '../actions/todo_lists';
import TodoListsComponent from '../components/todo_lists';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  updateTodoLists,
  FetchTodoLists,
  updateToken,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoListsComponent);
