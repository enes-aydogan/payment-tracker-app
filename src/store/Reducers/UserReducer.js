import * as UserActionType from '../Actions/user/UserActionType';
import userInitialState from './InitialStates/UserInitialState';

export default userReducer = (state, action) => {
  if (state == null) state = userInitialState;

  const { type, payload } = action;
  switch (type) {
    case UserActionType.GET_USER_INFO_LOADING:
      return {
        ...state,
        getUserInfo: {
          ...state.getUserInfo,
          userLoading: true,
          userError: null,
        },
      };
    case UserActionType.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getUserInfo: {
          ...state.getUserInfo,
          userLoading: false,
          userData: payload,
          userError: null,
        },
      };
    case UserActionType.GET_USER_INFO_FAIL:
      return {
        ...state,
        getUserInfo: {
          ...state.getUserInfo,
          userLoading: false,
          userError: payload,
        },
      };
    case UserActionType.GET_ME_LOADING:
      return {
        ...state,
        getMe: {
          ...state.getMe,
          getMeLoading: true,
          getMeError: null,
        },
      };
    case UserActionType.GET_ME_SUCCESS:
      return {
        ...state,
        getMe: {
          ...state.getMe,
          getMeData: payload,
          getMeLoading: false,
          getMeError: null,
        },
      };
    case UserActionType.GET_ME_FAIL:
      return {
        ...state,
        getMe: {
          ...state.getMe,
          getMeLoading: false,
          getMeError: payload,
        },
      };
    case UserActionType.IS_USER_EXIST_LOADING:
      return {
        ...state,
        getIsUserExist: {
          ...state.getIsUserExist,
          isUserExistLoading: true,
          isUserExistError: null,
        },
      };
    case UserActionType.IS_USER_EXIST_SUCCESS:
      return {
        ...state,
        getIsUserExist: {
          ...state.getIsUserExist,
          isUserExistData: payload,
          isUserExistError: null,
          isUserExistLoading: false,
        },
      };
    case UserActionType.IS_USER_EXIST_FAIL:
      return {
        ...state,
        getIsUserExist: {
          ...state.getIsUserExist,
          isUserExistError: payload,
          isUserExistLoading: false,
        },
      };
    default:
      return state;
  }
};
