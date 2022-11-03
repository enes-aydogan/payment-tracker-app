import * as OrgActionType from '../Actions/organization/OrgActionType';

function getInitialState() {
  return {    
    organizations: null,
    users: null
  };
}

export default orgReducer = (state, action) => {
  if (state == null) {
    state = getInitialState();
  }

  const {type, payload} = action;
  switch (type) {
    case OrgActionType.GET_ALL_ORGANIZATION:
      return {
        ...state,        
        organizations: payload.data,        
      };
    case OrgActionType.GET_USERS_BY_ORGID:
      return {
        ...state,        
        users: payload.data,
      };
    default:
      return state;
  }
};
