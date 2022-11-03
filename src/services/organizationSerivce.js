import api from './api';

const getAll = _ => {
  return api.get('/org-user/getOrgsByUserID');
};

const addUserToOrg = orgUser => {
  return api.post('/org-user/', {orgID: orgUser.orgID, userID: orgUser.userID});
};

const getUsersByOrgID = orgID => {
  return api.get(`/org-user/${orgID}`);
};
export default {getAll, addUserToOrg, getUsersByOrgID};
