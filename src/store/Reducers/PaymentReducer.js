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
    case PaymentActionType.GET_OWN_PAST_PAYMENTS_LOADING:
      return {
        ...state,
        getOwnPastPayments: {
          ...state.getOwnPastPayments,
          loading: true,
          error: null,
        },
      };
    case PaymentActionType.GET_OWN_PAST_PAYMENTS_SUCCESS:
      return {
        ...state,
        getOwnPastPayments: {
          ...state.getOwnPastPayments,
          paymentData: payload,
          paymentLoading: false,
          paymentError: null,
        },
      };
    case PaymentActionType.GET_OWN_PAST_PAYMENTS_FAIL:
      return {
        ...state,
        getOwnPastPayments: {
          ...state.getOwnPastPayments,
          loading: false,
          error: payload,
        },
      };
    case PaymentActionType.GET_OWN_PAST_DEBT_LOADING:
      return {
        ...state,
        getOwnPastDebts: {
          ...state.getOwnPastDebts,
          loading: true,
          error: null,
        },
      };
    case PaymentActionType.GET_OWN_PAST_DEBT_SUCCESS:
      return {
        ...state,
        getOwnPastDebts: {
          ...state.getOwnPastDebts,
          debtData: payload,
          loading: false,
          error: null,
        },
      };
    case PaymentActionType.GET_OWN_PAST_DEBT_FAIL:
      return {
        ...state,
        getOwnPastDebts: {
          ...state.getOwnPastDebts,
          loading: false,
          error: payload,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_LOADING:
      return {
        ...state,
        getAllPastPayments: {
          ...state.getAllPastPayments,
          allPastPaymentsLoading: true,
          allPastPaymentsError: null,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_SUCCESS:
      return {
        ...state,
        getAllPastPayments: {
          ...state.getAllPastPayments,
          allPastPaymentsData: payload,
          allPastPaymentsError: null,
          allPastPaymentsLoading: false,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_ERROR:
      return {
        ...state,
        getAllPastPayments: {
          ...state.getAllPastPayments,
          allPastPaymentsError: payload,
          allPastPaymentsLoading: false,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_LOADIN:
      return {
        ...state,
        getAllPastPaymentsByPerID: {
          ...state.getAllPastPaymentsByPerID,
          allPastPaymentsByPerIDLoading: true,
          allPastPaymentsByPerIDError: null,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_SUCCESS:
      return {
        ...state,
        getAllPastPaymentsByPerID: {
          ...state.getAllPastPaymentsByPerID,
          allPastPaymentsByPerIDData: payload,
          allPastPaymentsByPerIDError: null,
          allPastPaymentsByPerIDLoading: false,
        },
      };
    case PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_FAIL:
      return {
        ...state,
        getAllPastPaymentsByPerID: {
          ...state.getAllPastPaymentsByPerID,
          allPastPaymentsByPerIDError: payload,
          allPastPaymentsByPerIDLoading: false,
        },
      };
    default:
      return state;
  }
};
