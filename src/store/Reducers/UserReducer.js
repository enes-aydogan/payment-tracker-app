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
    default:
      return state;
  }
};
