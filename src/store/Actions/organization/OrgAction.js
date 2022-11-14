import * as OrgActionType from './OrgActionType';
import organizationSerivce from '../../../services/organizationSerivce';

export const getAllOrgs = _ => dispatch => {
  dispatch({
    type: OrgActionType.GET_ALL_ORGANIZATIONS_LOADING,
  });
  organizationSerivce
    .getAll()
    .then(response => {
      console.log('res');
      if (response.data.success) {
        dispatch({
          type: OrgActionType.GET_ALL_ORGANIZATIONS_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: OrgActionType.GET_ALL_ORGANIZATIONS_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const addUserToOrg = orgUser => dispatch => onSuccess => {
  dispatch({
    type: OrgActionType.ADD_USER_TO_ORG_LOADING,
  });
  organizationSerivce
    .addUserToOrg(orgUser)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: OrgActionType.ADD_USER_TO_ORG_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
        onSuccess(response.data);
      }
    })
    .catch(error => {
      dispatch({
        type: OrgActionType.ADD_USER_TO_ORG_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getUsersByOrgID = orgID => dispatch => {
  dispatch({
    type: OrgActionType.GET_USERS_BY_ORGID_LOADING,
  });
  organizationSerivce
    .getUsersByOrgID(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: OrgActionType.GET_USERS_BY_ORGID_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: OrgActionType.GET_USERS_BY_ORGID_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};
