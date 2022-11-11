import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthActionType from './AuthActionType';
import authService from '../../../services/authService';

export const logIn = user => dispatch => {
  dispatch({
    type: AuthActionType.LOGIN_LOADING,
  });
  authService
    .logIn(user)
    .then(response => {
      if (response.data.success) {
        AsyncStorage.setItem('access_token', response.data.data.token);
        AsyncStorage.setItem(
          'user',
          JSON.stringify({
            id: response.data.data.id,
            mail: user.mail,
            password: user.password,
          }),
        );
        dispatch({
          type: AuthActionType.LOGIN_SUCCESS,
          payload: {
            access_token: response.data.data.token,
            user: {
              id: response.data.data.id,
              mail: user.mail,
              password: user.password,
            },
          },
        });
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: AuthActionType.LOGIN_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const setAuthState = data => dispatch => {
  dispatch({
    type: AuthActionType.LOGIN_SUCCESS,
    payload: {
      access_token: data.access_token,
      user: {
        id: data.user.id,
        mail: data.user.mail,
        password: data.user.password,
      },
    },
  });
};

export const logOut = user => dispatch => {
  authService.logOut().then(response => {
    if (response.status === 'success') {
      return dispatch({
        type: AuthActionType.LOGOUT,
      });
    }
  });
};

export const register = user => dispatch => {
  return authService
    .register(user)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: AuthActionType.REGISTER,
          payload: {
            data: response.data.data,
          },
        });
        return response.data;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};
