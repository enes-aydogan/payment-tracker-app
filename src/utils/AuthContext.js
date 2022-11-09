import React, { createContext, useState, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrgReducer from '../store/Reducers/OrgReducer';
import orgInitialState from '../store/Reducers/InitialStates/OrgInitialState';
import PaymentReducer from '../store/Reducers/PaymentReducer';
import paymentInitialState from '../store/Reducers/InitialStates/PaymentInitialState';
import userInitialState from '../store/Reducers/InitialStates/UserInitialState';
import UserReducer from '../store/Reducers/UserReducer';
import PeriodReducer from '../store/Reducers/PeriodReducer';
import periodInitialState from '../store/Reducers/InitialStates/PeriodInitialState';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    authenticated: null,
    user: {
      mail: null,
      password: null,
      id: null,
    },
  });

  const logout = () => {
    AsyncStorage.clear();
    setAuthState({
      accessToken: null,
      authenticated: false,
      user: {
        mail: null,
        password: null,
        id: null,
      },
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const [orgState, orgDispatch] = useReducer(OrgReducer, orgInitialState);
  const [paymentState, paymentDispatch] = useReducer(
    PaymentReducer,
    paymentInitialState,
  );
  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);

  const [periodState, periodDispatch] = useReducer(
    PeriodReducer,
    periodInitialState,
  );

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
        orgState,
        orgDispatch,
        paymentState,
        paymentDispatch,
        userState,
        userDispatch,
        periodState,
        periodDispatch,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

/*
import {createContext, useContext, useState} from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
 */
