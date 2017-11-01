import { AsyncStorage } from 'react-native';

import { NavigationActions } from 'react-navigation';


export function changeLoginFormData(data) {
  return dispatch => (
    dispatch({ type: 'CHANGE_FORM_DATA', payload: data })
  );
}

export function updateToken(token) {
  return dispatch => (
    dispatch({ type: 'UPDATE_TOKEN', payload: token })
  );
}

export function setToken(token) {
  return AsyncStorage.setItem('auth_token', token);
}

export function getToken() {
  return AsyncStorage.getItem('auth_token');
}


export function login(email, password) {
  const url = 'http://todogo.cloud/api/v1/auth/login/';

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}


export function Login(email, password) {
  return dispatch => (
    login(email, password)
      .then(response => response.json())
      .then(
        (body) => {
          setToken(body.token).then(() => {});

          dispatch({ type: 'UPDATE_TOKEN', payload: body.token });
          dispatch(NavigationActions.navigate({ routeName: 'TodoLists' }));
        })
      .catch((error) => {
        console.error('ERROR: ', error);
      })
  );
}


export function Navigate(routeName) {
  return dispatch => (
    dispatch(NavigationActions.navigate({ routeName }))
  );
}
