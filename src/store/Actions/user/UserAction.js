import * as UserActionType from './UserActionType';
import userService from '../../../services/userService';
import authService from '../../../services/authService';

export const isUserExist = mail => dispatch => onSuccess => {
  dispatch({
    type: UserActionType.IS_USER_EXIST_LOADING,
  });
  userService
    .isUserExist(mail)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.IS_USER_EXIST_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
        onSuccess(response.data);
      }
    })
    .catch(error => {
      dispatch({
        type: UserActionType.IS_USER_EXIST_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getUserByID = userID => dispatch => {
  return userService
    .getUserByID(userID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.GET_USER_BY_ID,
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

export const getUserInfo = _ => dispatch => {
  dispatch({
    type: UserActionType.GET_USER_INFO_LOADING,
  });
  userService
    .getUserInfo()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.GET_USER_INFO_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: UserActionType.GET_USER_INFO_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getMe = _ => dispatch => {
  dispatch({
    type: UserActionType.GET_ME_LOADING,
  });
  return authService
    .getMe()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.GET_ME_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: UserActionType.GET_ME_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};
