import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './Reducers/AuthReducer';
import orgReducer from './Reducers/OrgReducer';
import paymentReducer from './Reducers/PaymentReducer';
import userReducer from './Reducers/UserReducer';
import periodReducer from './Reducers/PeriodReducer';

const middlewares = [thunk];

const RootReducers = combineReducers({
  authReducer,
  orgReducer,
  paymentReducer,
  userReducer,
  periodReducer,
});

export default store = createStore(
  RootReducers,
  compose(applyMiddleware(...middlewares)),
);
