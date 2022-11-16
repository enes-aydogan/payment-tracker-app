import { Provider } from 'react-redux';
import React from 'react';

import NavigationProvider from './src/navigations/auth-navigator';
import { AuthProvider } from './src/utils/AuthContext';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationProvider></NavigationProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
