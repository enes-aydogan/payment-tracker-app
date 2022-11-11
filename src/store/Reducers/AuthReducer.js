import * as AuthActionType from '../Actions/auth/AuthActionType';
import authInitialState from './InitialStates/AuthInitialState';

export default authReducer = (state, action) => {
  if (state == null) {
    state = authInitialState;
  }

  const { type, payload } = action;
  switch (type) {
    case AuthActionType.LOGIN_LOADING:
      return {
        ...state,
        isLoggedIn: false,
        authError: null,
        authLoading: true,
      };
    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authData: payload,
        authError: null,
        authLoading: false,
      };
    case AuthActionType.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        authError: payload,
        authLoading: false,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authData: null,
        authError: null,
        authLoading: false,
      };
    case AuthActionType.CLEAR_STATE:
      return {
        isLoggedIn: false,
        authData: null,
        authError: null,
        authLoading: false,
      };
    default:
      return state;
  }
};
