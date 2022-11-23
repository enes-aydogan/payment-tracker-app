import * as OrgActionType from '../Actions/organization/OrgActionType';

function getInitialState() {
  return {
    organizations: null,
    users: null,
  };
}

export default orgReducer = (state, action) => {
  if (state == null) {
    state = getInitialState();
  }

  const { type, payload } = action;
  switch (type) {
    case OrgActionType.GET_USERS_BY_ORGID:
      return {
        ...state,
        users: payload,
      };
    case OrgActionType.GET_ALL_ORGANIZATIONS_LOADING:
      return {
        ...state,
        getAllOrganizations: {
          ...state.getAllOrganizations,
          loading: true,
          error: null,
        },
      };
    case OrgActionType.GET_ALL_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        getAllOrganizations: {
          ...state.getAllOrganizations,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case OrgActionType.GET_ALL_ORGANIZATIONS_FAIL:
      return {
        ...state,
        getAllOrganizations: {
          ...state.getAllOrganizations,
          loading: false,
          error: payload,
        },
      };
    case OrgActionType.GET_USERS_BY_ORGID_LOADING:
      return {
        ...state,
        getUsersByOrgID: {
          ...state.getUsersByOrgID,
          usersLoading: true,
          usersError: null,
        },
      };
    case OrgActionType.GET_USERS_BY_ORGID_SUCCESS:
      return {
        ...state,
        getUsersByOrgID: {
          ...state.getUsersByOrgID,
          usersData: payload,
          usersLoading: false,
          usersError: null,
        },
      };
    case OrgActionType.GET_USERS_BY_ORGID_FAIL:
      return {
        ...state,
        getUsersByOrgID: {
          ...state.getUsersByOrgID,
          usersLoading: false,
          usersError: payload,
        },
      };
    case OrgActionType.ADD_USER_TO_ORG_LOADING:
      return {
        ...state,
        getAddUserToOrg: {
          ...state.getAddUserToOrg,
          addUserToOrgLoading: true,
          addUserToOrgError: null,
        },
      };
    case OrgActionType.ADD_USER_TO_ORG_SUCCESS:
      return {
        ...state,
        getAddUserToOrg: {
          ...state.getAddUserToOrg,
          addUserToOrgData: payload,
          addUserToOrgError: null,
          addUserToOrgLoading: false,
        },
      };
    case OrgActionType.ADD_USER_TO_ORG_FAIL:
      return {
        ...state,
        getAddUserToOrg: {
          ...state.getAddUserToOrg,
          addUserToOrgError: payload,
          addUserToOrgLoading: false,
        },
      };
    case OrgActionType.CREATE_ORGANIZATION_LOADING:
      return {
        ...state,
        getCreateOrganization: {
          ...state.getCreateOrganization,
          createOrganizationError: null,
          createOrganizationLoading: true,
        },
      };
    case OrgActionType.CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        getCreateOrganization: {
          ...state.getCreateOrganization,
          createOrganizationData: payload,
          createOrganizationError: null,
          createOrganizationLoading: false,
        },
      };
    case OrgActionType.CREATE_ORGANIZATION_FAIL:
      return {
        ...state,
        getCreateOrganization: {
          ...state.getCreateOrganization,
          createOrganizationError: payload,
          createOrganizationLoading: false,
        },
      };
    default:
      return state;
  }
};
