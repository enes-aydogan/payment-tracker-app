import paymentService from '../../../services/paymentService';
import * as PaymentActionType from './PaymentActionType';

export const create = (payment, orgID) => dispatch => {
  return paymentService
    .create(payment, orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.CREATE,
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

export const getInfo = _ => dispatch => {
  dispatch({
    type: PaymentActionType.GET_INFO_LOADING,
  });
  paymentService
    .getInfo()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_INFO_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PaymentActionType.GET_INFO_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getOwnPayments = orgID => dispatch => {
  return paymentService
    .getOwnPayments(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_PAYMENTS,
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

export const getOwnDebt = _ => dispatch => {
  return paymentService
    .getOwnDebt()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_DEBT,
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

export const getAllPastPayments = orgID => dispatch => {
  dispatch({
    type: PaymentActionType.GET_ALL_PAST_PAYMENTS_LOADING,
  });
  paymentService
    .getAllPastPayments(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_ALL_PAST_PAYMENTS_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PaymentActionType.GET_ALL_PAST_PAYMENTS_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getAllPastPaymentsByPerID = (orgID, perID) => dispatch => {
  dispatch({
    type: PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_LOADIN,
  });
  paymentService
    .getAllPastPaymentsByPerID(orgID, perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PaymentActionType.GET_ALL_PAST_PAYMENTS_BY_PERID_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getOwnPastPayments = perID => dispatch => {
  dispatch({
    type: PaymentActionType.GET_OWN_PAST_PAYMENTS_LOADING,
  });
  paymentService
    .getOwnPastPayments(perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_PAST_PAYMENTS_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PaymentActionType.GET_OWN_PAST_PAYMENTS_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};

export const getOwnPastDebts = perID => dispatch => {
  dispatch({
    type: PaymentActionType.GET_OWN_PAST_DEBT_LOADING,
  });
  paymentService
    .getOwnPastDebts(perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_PAST_DEBT_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PaymentActionType.GET_OWN_PAST_DEBT_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};
