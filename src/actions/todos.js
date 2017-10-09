import { NavigationActions } from 'react-navigation';
import store from '../store';


export function updateTodos(data) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODOS', payload: data })
  );
}

export function updateTodoListId(todoListId) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODO_LIST_ID', payload: todoListId })
  );
}

export function updateTodoFormData(data) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODO_FORM_DATA', payload: data })
  );
}

export function fetchTodos(todoListId) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_TODOS_LOADING_FLAG', payload: true });
    const { token } = store.getState().loginReducer;
    const url = `http://todogo.cloud/api/v1/list/${todoListId}/todo/`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(
          (body) => {
            dispatch({ type: 'UPDATE_TODOS_LOADING_FLAG', payload: false });
            dispatch(updateTodos(body));
          },
        );
      } else {
        console.log('ERROR: ', response.status);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    }).catch((error) => {
      console.log('ERROR: ', error);
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
    });
  };
}

export function createTodo(todoListId, data) {
  return (dispatch) => {
    const url = `http://todogo.cloud/api/v1/list/${todoListId}/todo/`;
    const { token } = store.getState().loginReducer;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
      body: JSON.stringify({
        completed: false,
        note: '',
        ...data,
      }),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(
          () => {
            dispatch(fetchTodos(todoListId));
            dispatch(updateTodoFormData({}));
          },
        );
      } else {
        console.log('ERROR: ', response.status);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    }).catch((error) => {
      console.log('ERROR: ', error);
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
    });
  };
}

export function toggleCompletedTodo(data, completed) {
  return (dispatch) => {
    const url = `http://todogo.cloud/api/v1/list/${data.todo_list_id}/todo/${data.id}/`;
    const { token } = store.getState().loginReducer;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
      body: JSON.stringify({
        ...data,
        completed,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(
          () => {
            dispatch(fetchTodos(data.todo_list_id));
            dispatch(updateTodoFormData({}));
          },
        );
      } else {
        console.log('ERROR: ', response.status);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    }).catch((error) => {
      console.log('ERROR: ', error);
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
    });
  };
}

export function deleteTodo(todoListId, todoId) {
  return (dispatch) => {
    const url = `http://todogo.cloud/api/v1/list/${todoListId}/todo/${todoId}/`;
    const { token } = store.getState().loginReducer;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
    }).then((response) => {
      if (response.status === 204) {
        dispatch(fetchTodos(todoListId));
      } else {
        console.log('ERROR: ', response.status);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    }).catch((error) => {
      console.log('ERROR: ', error);
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
    });
  };
}
