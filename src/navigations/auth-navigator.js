import { Provider } from '@react-native-material/core';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/RootNavigation';
import AppNavigator from './app-navigator';
import LoginScreen from '../scenes/auth/login';
import RegisterScreen from '../scenes/auth/register';
import LogoutScreen from '../scenes/auth/logout';
import { AuthProvider, AuthContext } from '../utils/AuthContext';
import * as AuthAction from '../store/Actions/auth/AuthAction';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {
    authDispatch,
    authState: { isLoggedIn },
  } = useContext(AuthContext);

  async function getUserFromStorage() {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('access_token');

    if (user) {
      data = {
        acces_token: token,
        user: {
          mail: JSON.parse(user).mail,
          password: JSON.parse(user).password,
          id: JSON.parse(user).id,
        },
      };
      AuthAction.setAuthState(data)(authDispatch);
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

const NavigationProvider = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default NavigationProvider;
