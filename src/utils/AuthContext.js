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
import AuthInitialState from '../store/Reducers/InitialStates/AuthInitialState';
import AuthReducer from '../store/Reducers/AuthReducer';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);
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
        authDispatch,
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
