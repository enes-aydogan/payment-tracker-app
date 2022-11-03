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
  return paymentService
    .getInfo()
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_INFO,
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
  return paymentService
    .getAllPastPayments(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_ALL_PAST_PAYMENTS,
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

export const getOwnPastPayments = perID => dispatch => {
  return paymentService
    .getOwnPastPayments(perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_PAST_PAYMENTS,
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

export const getOwnPastDebt = perID => dispatch => {
  return paymentService
    .getOwnPastDebt(perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PaymentActionType.GET_OWN_PAST_DEBT,
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
