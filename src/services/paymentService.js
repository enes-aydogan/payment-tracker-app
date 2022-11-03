import api from './api';

const getInfo = _ => {
  return api.get('/payment/getInfo');
};

const getOwnPayments = orgID => {
  return api.get(`/payment/ownPayments/${orgID}`);
};

const getOwnDebt = _ => {
  return api.get('/payment/ownDebt');
};

const getOwnPastPayments = perID => {
  return api.get(`/payment/ownPastPayments/${perID}`);
};

const getOwnPastDebt = perID => {
  return api.get(`/payment/ownPastDebt/${perID}`);
};

const getAllPastPayments = orgID => {
  return api.get(`/payment/allPastPayments/${orgID}`);
};

const create = (payment, orgID) => {
  return api.post(`/payment/${orgID}`, {
    description: payment.description,
    price: payment.price,
    stuffIDs: payment.stuffIDs,
  });
};

export default {
  create,
  getInfo,
  getOwnPayments,
  getOwnDebt,
  getOwnPastPayments,
  getAllPastPayments,
  getOwnPastDebt,
};
