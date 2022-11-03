import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './Reducers/AuthReducer';
import orgReducer from './Reducers/OrgReducer';

const middlewares = [thunk];

const RootReducers = combineReducers({
  authReducer,
  orgReducer
});

export default store = createStore(
  RootReducers,
  compose(applyMiddleware(...middlewares)),
);
