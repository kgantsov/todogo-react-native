import { NavigationActions } from 'react-navigation';
import store from '../store';
import { updateTodoListId } from './todos';


export function updateTodoLists(data) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODO_LISTS', payload: data })
  );
}

export function updateTodoListFormData(data) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODO_LIST_FORM_DATA', payload: data })
  );
}

export function openTodoList(todoListId) {
  return (dispatch) => {
    dispatch(updateTodoListId(todoListId));
    dispatch(NavigationActions.navigate({ routeName: 'Todos' }));
  };
}

export function FetchTodoLists() {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOADING_FLAG', payload: true });

    const { token } = store.getState().loginReducer;
    const url = 'http://todogo.cloud/api/v1/list/';

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
            dispatch({ type: 'UPDATE_LOADING_FLAG', payload: false });
            dispatch(updateTodoLists(body));
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

export function CreateTodoList(data) {
  return (dispatch) => {
    const url = 'http://todogo.cloud/api/v1/list/';
    const { token } = store.getState().loginReducer;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': token,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(
          () => {
            dispatch(FetchTodoLists());
            dispatch(updateTodoListFormData({}));
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

export function deleteTodoList(todoId) {
  return (dispatch) => {
    const url = `http://todogo.cloud/api/v1/list/${todoId}/`;
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
        dispatch(FetchTodoLists());
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
