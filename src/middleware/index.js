import {
  ASYNC_START,
  ASYNC_END,
  USER_LOGIN,
  USER_LOGOUT
} from '../actions/types';

const loggerMiddleware = store => next => action => {
  if(action !== undefined){
    console.group(action.type)
  }else{
    console.group('promise...')
    console.log(action)    
  }
  //console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const crashReporter = store => next => action => {
  try {
    //return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    
    //throw err
  }
}
const api = store => next => action => {
  console.log('WIP api middleware for async requests', action)

  next(action);
};

const localStorageMiddleware = store => next => action => {
  console.log('WIP local storage jwt', action)
/* 
  if (action.type === USER_LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === USER_LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  } */

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

export { api, localStorageMiddleware};
