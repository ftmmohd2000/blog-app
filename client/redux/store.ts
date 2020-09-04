import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { userReducer } from "./reducers/user";
import { postReducer } from "./reducers/post";

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const getStore = () =>
  createStore(
    combineReducers({ user: userReducer, post: postReducer }),
    composeEnhancers(applyMiddleware())
  );
