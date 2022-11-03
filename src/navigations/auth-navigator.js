import {Provider} from '@react-native-material/core';
import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from './app-navigator';
import LoginScreen from '../scenes/auth/login';
import RegisterScreen from '../scenes/auth/register';
import {AuthProvider, AuthContext} from '../utils/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  //const [user, setUser] = useAuth();
  const authContext = useContext(AuthContext);

  async function getUserFromStorage() {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('access_token');

    if (user) {      
      authContext.setAuthState({
        accessToken: token,
        authenticated: true,
        user: {
          mail: JSON.parse(user).mail,
          password: JSON.parse(user).password,
          id: JSON.parse(user).id,
        },
      });
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authContext?.authState?.authenticated ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />          
            <Stack.Screen name="Register" component={RegisterScreen} />          
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavigationProvider = () => {
  return (
    <Provider>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </Provider>
  );
};

export default NavigationProvider;
