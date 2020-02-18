import * as ActionTypes from "./types";
import Axios from "axios";

const accessToken = 'dXNlcj1hZG1pbgpjb21wYW55PUNPTVBBTllBCg==';
//const API_BASE_URL = 'http://0.0.0.0:5000/api'
const API_BASE_URL = 'http://localhost:5000/api'
//const API_BASE_URL = 'http://10.0.2.2:5000/api'
const EMPLOYE_ENDPOINT = API_BASE_URL + '/employe';
 // axios default configs
// axios.defaults.baseURL = EMPLOYE_ENDPOINT;
//Axios.defaults.headers.common["Content-Type"] = "application/json";
//Axios.defaults.headers.common["X-PINGOTHER"] = "pingpong";

//Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//Axios.defaults.withCredentials = true


 /**
 * POST
 */
export const addEmploye = employe => dispatch => {

  const request = Axios.post(EMPLOYE_ENDPOINT, employe)
  
  return (dispatch, setState) => {
    dispatch(addEmployeStarted(employe));
    request
      .then(res => {
        dispatch(addEmployeSuccess(res.data));
      })
      .catch(err => {
        dispatch(addEmployeFailure(err.message));
      })
  }
}

const addEmployeSuccess = payload => ({
  type: ActionTypes.ADD_EMPLOYE_SUCCESS,
  payload
});

const addEmployeStarted = employe => ({
  type: ActionTypes.ADD_EMPLOYE_STARTED,
  payload: {
    ...employe
  }
});

const addEmployeFailure = error => ({
  type: ActionTypes.ADD_EMPLOYE_FAILURE,
  payload: {
    error
  }
});


/**
 * GET
*/
const requestEmployesStarted = () => ({
  type: ActionTypes.REQUEST_EMPLOYES_STARTED
})

const requestEmployesSuccess = json => ({
  type: ActionTypes.REQUEST_EMPLOYES_SUCCESS,
  employes: json._items.map(item => {
    return Object.assign({}, item)
  }),
  receivedAt: Date.now()
})

const requestEmployesFailure = error => ({
  type: ActionTypes.REQUEST_EMPLOYES_FAILURE,
  payload: {
    error
  }
});

export const fetchEmployes = dispatch => {
  const request = Axios.get(EMPLOYE_ENDPOINT);
  
  return dispatch => {
    dispatch(requestEmployesStarted())

    request
      .then(res => {
        dispatch(requestEmployesSuccess(res.data))
      })
      .catch(err => {
        dispatch(requestEmployesFailure(err.message));
      })
  }
}

export const __fetchEmployes = dispatch => {
  return dispatch => {
    dispatch(requestEmployesStarted())

    fetch(EMPLOYE_ENDPOINT)
    .then(response => response.json())
    .then(json => dispatch(requestEmployesSuccess(json)))
  }
}


/**
 * PUT
 */
export const updateEmploye = employe => dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'If-Match': employe._etag
  }
  const id = employe._id
  delete employe._id
  delete employe._etag
  const request = Axios.put(EMPLOYE_ENDPOINT+'/'+id, employe, {headers: headers})
  return dispatch => {
    dispatch(updateEmployeStarted(employe));
    request
      .then(res => {
        dispatch(updateEmployeSuccess(res.data));
      })
      .catch(err => {
        dispatch(updateEmployeFailure(err.message));
      })
  }
}

const updateEmployeStarted = employe => ({
  type: ActionTypes.UPDATE_EMPLOYE_STARTED,
  payload: {
    ...employe
  }
});

const updateEmployeSuccess = payload => ({
  type: ActionTypes.UPDATE_EMPLOYE_SUCCESS,
  payload
});

const updateEmployeFailure = error => ({
  type: ActionTypes.UPDATE_EMPLOYE_FAILURE,
  payload: {
    error
  }
});


/**
 * DELETE
 */
export const deleteEmploye = employe => dispatch => {
  const headers = {
    'If-Match': employe._etag
  }

  const request = Axios.delete(EMPLOYE_ENDPOINT+'/'+employe._id, {headers: headers})
  return dispatch => {
    dispatch(deleteEmployeStarted(employe));
    request
      .then(res => {
        dispatch(deleteEmployeSuccess(employe._id));
      })
      .catch(err => {
        dispatch(deleteEmployeFailure(err.message));
      })
  }
}

const deleteEmployeStarted = deleteEmploye => ({
  type: ActionTypes.DELETE_EMPLOYE_STARTED,
  payload: {
    ...deleteEmploye
  }
});

const deleteEmployeSuccess = id => ({
  type: ActionTypes.DELETE_EMPLOYE_SUCCESS,
  id 
});

const deleteEmployeFailure = error => ({
  type: ActionTypes.DELETE_EMPLOYE_FAILURE,
  payload: {
    error
  }
});
