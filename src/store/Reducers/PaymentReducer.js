import * as PaymentActionType from '../Actions/payment/PaymentActionType';
import paymentInitialState from './InitialStates/PaymentInitialState';

export default paymentReducer = (state, action) => {
  if (state == null) state = paymentInitialState;

  const { type, payload } = action;
  switch (type) {
    case PaymentActionType.GET_INFO_LOADING:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          loading: true,
          error: null,
        },
      };
    case PaymentActionType.GET_INFO_SUCCESS:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case PaymentActionType.GET_INFO_FAIL:
      return {
        ...state,
        getInfo: {
          ...state.getInfo,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};
