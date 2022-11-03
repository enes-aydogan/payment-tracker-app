import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthActionType from './AuthActionType';
import authService from '../../../services/authService';

export const logIn = user => dispatch => {
  return authService
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
          type: AuthActionType.LOGIN,
          payload: {
            access_token: response.data.data.token,
            user: {
              id: response.data.data.id,
              mail: user.mail,
              password: user.password,
            },
          },
        });
        return response;
      }
    })
    .catch(error => {
      console.log('error', error);
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

export const getMe = _ => dispatch => {
  return authService
    .getMe()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: AuthActionType.GET_ME,
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
