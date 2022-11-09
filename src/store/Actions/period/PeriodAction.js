import * as PeriodActionType from './PeriodActionType';
import periodService from '../../../services/periodService';

export const finalizePeriod = orgID => dispatch => {
  return periodService
    .finalizePeriod(orgID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PeriodActionType.FINALIZE_PERIOD,
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

export const getSummary = perID => dispatch => {
  dispatch({
    type: PeriodActionType.GET_SUMMARY_LOADING,
  });
  periodService
    .getSummary(perID)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: PeriodActionType.GET_SUMMARY_SUCCESS,
          payload: {
            data: response.data.data,
          },
        });
      }
    })
    .catch(error => {
      dispatch({
        type: PeriodActionType.GET_SUMMARY_FAIL,
        payload: error.response
          ? error.response.data
          : { error: 'Something went wrong, try again' },
      });
    });
};
