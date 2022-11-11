import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '@react-native-material/core';
import { useDispatch } from 'react-redux';

import * as AuthAction from '../../store/Actions/auth/AuthAction';
import { AuthContext } from '../../utils/AuthContext';

const AboutScreen = () => {
  const {
    authDispatch,
    authState: {},
  } = useContext(AuthContext);

  /*   const logout = async () => {
    dispatch(AuthAction.logOut('asd'));
    authContext.setAuthState({
      accessToken: null,
      authenticated: false,
    });
  }; */

  const logout = () => {
    AuthAction.logOut()(authDispatch);
  };

  return (
    <SafeAreaView>
      <Button
        onPress={() => logout()}
        color="#717D84"
        variant="outlined"
        title="Logout"
      />
    </SafeAreaView>
  );
};

export default AboutScreen;
