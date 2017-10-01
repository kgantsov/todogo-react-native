import { NavigationActions } from 'react-navigation';


export function updateTodoLists(data) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TODO_LISTS', payload: data })
  );
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


export function FetchTodoLists(email, password) {
  return dispatch => (
    fetchTodoLists(email, password)
      .then((response) => {
        console.log('<<<<<<<<!!!!!!', response.status, response);
        if (response.status === 401) {
          console.error('ERROR: ', response.status);
          dispatch(NavigationActions.navigate({ routeName: 'Login' }));
        } else {
          response.json().then(
            (body) => {
              console.log('!!!!!!!', body);

              // setToken(body.token).then(() => {});

              // dispatch(NavigationActions.navigate({ routeName: 'TodoLists' }))
              updateTodoLists(body);
            },
          );
        }
      })
      .catch((error) => {
        console.error('ERROR: ', error);
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      })
  );
}
