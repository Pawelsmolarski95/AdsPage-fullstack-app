import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import adsReducer from "./adsRedux";
import usersReducer from "./usersRedux";

const subreducers = {
  ads: adsReducer,
  user: usersReducer,
};

const rootReducer = combineReducers(subreducers);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
