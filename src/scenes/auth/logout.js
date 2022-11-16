import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import * as AuthAction from '../../store/Actions/auth/AuthAction';
import { ActivityIndicator } from 'react-native';
const LogoutScreen = () => {
  const { authDispatch } = useContext(AuthContext);
  useEffect(() => {
    AuthAction.logOut()(authDispatch);
  }, []);

  return <ActivityIndicator />;
};

export default LogoutScreen;
