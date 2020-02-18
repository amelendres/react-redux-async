import { ADD_EMPLOYE, DELETE_EMPLOYE, UPDATE_EMPLOYE, APP_LOAD } from "./types";

export const appLoad = token => ({
  type: APP_LOAD, 
  token
})



//USER ACTION
export const onAddEmploye = employe => ({
  type: ADD_EMPLOYE,
  employe
})

export const onUpdateEmploye = id => ({
  type: UPDATE_EMPLOYE,
  id
})

export const deleteEmploye = id => ({
  type: DELETE_EMPLOYE,
  id
})



