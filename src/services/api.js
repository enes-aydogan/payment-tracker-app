import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../utils/RootNavigation';

const instance = axios.create({
  baseURL: 'https://trackingapi-nodejs.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
// https://trackingapi-nodejs.herokuapp.com/api/v1
// http://localhost:3000/api/v1
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 401) {
      RootNavigation.navigate('LogoutScreen');
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default instance;
