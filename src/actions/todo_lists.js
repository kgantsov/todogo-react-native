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
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOADING_FLAG', payload: true });

    fetchTodoLists(email, password)
      .then((response) => {
        console.log('<<<<<<<<!!!!!!', response.status, response);
        if (response.status === 200) {
          response.json().then(
            (body) => {
              console.log('!!!!!!!:::->', body);

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
