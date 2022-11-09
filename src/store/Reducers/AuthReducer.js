import * as AuthActionType from '../Actions/auth/AuthActionType';

function getInitialState() {
  return {
    isLoggedIn: false,
    user: null,
  };
}

export default authReducer = (state, action) => {
  if (state == null) {
    state = getInitialState();
  }

  const { type, payload } = action;
  switch (type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        acces_token: payload.acces_token,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
