import { NavigationActions } from 'react-navigation';


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
    console.log('..........', todoListId, dispatch);
  };
}

export function fetchTodoLists(token) {
  const url = 'http://todogo.cloud/api/v1/list/';

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Auth-Token': token,
    },
  });
}


export function FetchTodoLists(token) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOADING_FLAG', payload: true });

    fetchTodoLists(token)
      .then((response) => {
        if (response.status === 200) {
          response.json().then(
            (body) => {
              dispatch({ type: 'UPDATE_LOADING_FLAG', payload: false });
              dispatch({ type: 'UPDATE_TODO_LISTS', payload: body });
            },
          );
        } else {
          console.log('ERROR: ', response.status);
          dispatch(NavigationActions.navigate({ routeName: 'Login' }));
        }
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      });
  };
}

export function CreateTodoList(token, data) {
  return (dispatch) => {
    const url = 'http://todogo.cloud/api/v1/list/';

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
            dispatch(FetchTodoLists(token));
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
