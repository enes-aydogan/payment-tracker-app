import { Provider } from 'react-redux';
import React from 'react';

import NavigationProvider from './src/navigations/auth-navigator';

import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationProvider></NavigationProvider>
    </Provider>
  );
};

export default App;
