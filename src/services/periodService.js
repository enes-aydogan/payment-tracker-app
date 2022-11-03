import api from './api';

const finalizePeriod = orgID => {
  return api.post(`/period/finalize/${orgID}`);
};

const getSummary = perID => {
  return api.get(`/summary/${perID}`);
};
export default {finalizePeriod, getSummary};
