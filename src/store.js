import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import { localStorageMiddleware, loggerMiddleware } from './middleware';

import { createLogger } from 'redux-logger'
//import reducer from './reducers';
import createRootReducer from './reducers'

import { routerMiddleware } from 'connected-react-router'
//import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history'

//export const history = createHistory();
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, thunk, localStorageMiddleware)
  } else {
    //return applyMiddleware(myRouterMiddleware, thunk, localStorageMiddleware, loggerMiddleware, createLogger())
    return applyMiddleware(myRouterMiddleware, thunk, localStorageMiddleware, createLogger())
  }
};

export const store = createStore(
  createRootReducer(history), // root reducer with router state
  getMiddleware()
);
