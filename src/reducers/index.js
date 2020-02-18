import * as ActionTypes from "../actions/types";
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const defaultState = {
  appName: 'WORKMAN',
  token: null
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        token: action.token || null,
      }
      default:
        return state
    }
  }

const workman = (state = {employes:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EMPLOYE:
      return{
          ...state,
          employe: action.employe
        }
    case ActionTypes.ADD_EMPLOYE_STARTED:
    case ActionTypes.ADD_EMPLOYE_FAILURE:
        return {
          ...state,
          payload: action.payload
        }
    case ActionTypes.ADD_EMPLOYE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        redirectTo: '/'
      }
       
    case ActionTypes.ADD_EMPLOYE_FAILURE:
        return {
          ...state,
          payload: action.payload,
        }
    case ActionTypes.REQUEST_EMPLOYES_STARTED:
        return {
          ...state,
          isLoading: true
        }
    case ActionTypes.REQUEST_EMPLOYES_SUCCESS:
        return {
          ...state,
          employes: action.employes,
          lastUpdated: action.receivedAt,
          isLoading: false,
          redirectTo: false          
        }

    case ActionTypes.UPDATE_EMPLOYE_STARTED:
    case ActionTypes.UPDATE_EMPLOYE_FAILURE:
    case ActionTypes.UPDATE_EMPLOYE:
      return {
          ...state,
          payload: action.payload
        }
    case ActionTypes.UPDATE_EMPLOYE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        redirectTo: '/'
    }
    case ActionTypes.DELETE_EMPLOYE_STARTED:
    case ActionTypes.DELETE_EMPLOYE_FAILURE:
    case ActionTypes.DELETE_EMPLOYE:
      return{
        ...state,
        payload: action.payload
      }
    case ActionTypes.DELETE_EMPLOYE_SUCCESS:
        return{
        ...state,
        employes: state.employes.filter(item => item._id != action.id)
      }
    default:
      return state
  }
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  workman,
  app
})
export default createRootReducer