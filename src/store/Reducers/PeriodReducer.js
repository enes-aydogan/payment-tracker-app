import * as PeriodActionType from '../Actions/period/PeriodActionType';
import PeriodInitialState from './InitialStates/PeriodInitialState';

export default periodReducer = (state, action) => {
  if (state == null) {
    state = PeriodInitialState;
  }

  const { type, payload } = action;
  switch (type) {
    case PeriodActionType.GET_SUMMARY_LOADING:
      return {
        ...state,
        getSummary: {
          ...state.getSummary,
          summaryLoading: true,
          summaryError: null,
        },
      };
    case PeriodActionType.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        getSummary: {
          ...state.getSummary,
          summaryLoading: false,
          summaryData: payload,
          summaryError: null,
        },
      };
    case PeriodActionType.GET_SUMMARY_FAIL:
      return {
        ...state,
        getSummary: {
          ...state.getSummary,
          summaryLoading: false,
          summaryError: payload,
        },
      };
    case PeriodActionType.FINALIZE_PERIOD_LOADING:
      return {
        ...state,
        getFinalizePeriod: {
          ...state.getFinalizePeriod,
          finalizePeriodLoading: true,
          finalizePeriodError: null,
        },
      };
    case PeriodActionType.FINALIZE_PERIOD_SUCCESS:
      return {
        ...state,
        getFinalizePeriod: {
          ...state.getFinalizePeriod,
          finalizePeriodData: payload,
          finalizePeriodError: null,
          finalizePeriodLoading: false,
        },
      };
    case PeriodActionType.FINALIZE_PERIOD_FAIL:
      return {
        ...state,
        getFinalizePeriod: {
          finalizePeriodError: payload,
          finalizePeriodLoading: false,
        },
      };
    default:
      return state;
  }
};
