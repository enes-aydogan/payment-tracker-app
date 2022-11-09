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

const getOwnPastDebts = perID => {
  return api.get(`/payment/ownPastDebt/${perID}`);
};

const getAllPastPayments = orgID => {
  return api.get(`/payment/allPastPayments/${orgID}`);
};

const getAllPastPaymentsByPerID = (orgID, perID) => {
  return api.get(`/payment/allPastPaymentsByPerID/${orgID}/${perID}`);
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
  getOwnPastDebts,
  getAllPastPaymentsByPerID,
};
