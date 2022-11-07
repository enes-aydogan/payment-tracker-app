import api from './api';

const isUserExist = mail => {
  return api.post('/users/getUserByMail', { mail: mail });
};

const getUserByID = userID => {
  return api.get(`/users/${userID}`);
};

const getUserInfo = _ => {
  return api.get('/users/getUserInfo');
};
export default { isUserExist, getUserByID, getUserInfo };
