import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logIn = user => {
  return api.post('/auth/login', {
    email: user.mail,
    password: user.password,
  });
};

const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: 'success',
    message: 'You are logged out',
  };
};

const register = async user => {
  return api.post('/users', {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.mail,
    password: user.password,
  });
};

const getMe = () => {
  return api.get('/auth/me');
};

export default {
  logIn,
  logOut,
  getMe,
  register,
};
