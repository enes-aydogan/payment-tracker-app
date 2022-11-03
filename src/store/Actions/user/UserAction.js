import * as UserActionType from './UserActionType';
import userService from '../../../services/userService';

export const isUserExist = mail => dispatch => {
  return userService
    .isUserExist(mail)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.IS_USER_EXIST,
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
  return userService
    .getUserInfo()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: UserActionType.GET_USER_INFO,
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
