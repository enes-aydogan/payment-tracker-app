import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const Logout = () => {
  const { authDispatch } = useContext(AuthContext);

  useEffect(() => {
    logoutUser()(authDispatch);
  }, []);

  return <ActivityIndicator />;
};

export default Logout;
