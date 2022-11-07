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
    case OrgActionType.GET_ALL_ORGANIZATION:
      return {
        ...state,
        organizations: payload,
      };
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
    default:
      return state;
  }
};
