import api from './api';

const getAll = _ => {
  return api.get('/org-user/getOrgsByUserID');
};

const createOrganization = organization => {
  return api.post('/organization', {
    name: organization.name,
    address: organization.address,
  });
};

const addUserToOrg = orgUser => {
  return api.post(`/org-user/${orgUser.userID}/${orgUser.orgID}`);
};

const getUsersByOrgID = orgID => {
  return api.get(`/org-user/${orgID}`);
};
export default { getAll, addUserToOrg, getUsersByOrgID, createOrganization };
