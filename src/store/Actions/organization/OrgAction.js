import * as OrgActionType from './OrgActionType';
import organizationSerivce from '../../../services/organizationSerivce';

export const getAllOrgs = _ => dispatch => {
  return organizationSerivce
    .getAll()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: OrgActionType.GET_ALL_ORGANIZATION,
          payload: {
            data: response.data.data,
          },
        });
        return response.data;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const addUserToOrg = orgUser => dispatch => {
  return organizationSerivce
    .addUserToOrg(orgUser)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: OrgActionType.ADD_USER_TO_ORG,
          payload: {
            data: response.data.data,
          },
        });
        return response.data;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const getUsersByOrgID = orgID => dispatch => {
  return organizationSerivce
    .getUsersByOrgID(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: OrgActionType.GET_USERS_BY_ORGID,
          payload: {
            data: response.data.data,
          },
        });
        return response.data;
      }
    })
    .catch(error => {
      console.log('error', error);
    });
};
