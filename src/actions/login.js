import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native";


export function changeLoginFormData(data) {
  return dispatch => (
    dispatch({ type: 'CHANGE_FORM_DATA', payload: data })
  );
}


export function login(email, password) {
  const url = `http://todogo.cloud/api/v1/auth/login/`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  });
}


export function Login(email, password) {
  return dispatch => (
    login(email, password)
      .then((response) => response.json())
      .then(
        (body) => {
          console.log('!!!!!!!', body);

          setToken(body.token).then(() => {});

          dispatch({
            type: 'LOGIN_REQUEST',
            payload: body.token,
          })
        })
      .catch((error) => {
        console.error("ERROR: ", error);
      })
  );
}


export function setToken(token) {
  return AsyncStorage.setItem('auth_token', token)
}

export function getToken() {
  return AsyncStorage.getItem('auth_token');
}
