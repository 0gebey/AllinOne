import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['userName'],
  userSuccess: ['userProfile'],
  userFailure: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userProfile: null,
  isNameTrue: false,
  userFailed: true,

  })

/* ------------- Selectors ------------- */
export const LoginSelectors = {
  getuserProfile: state => state.userProfile
}


/* ------------- Reducers ------------- */

// request the profileInfo from an api
export const request = (state) => {
  return {...state,isNameTrue: false,userFailed: false, userProfile: null}
}
// successful api lookup
export const success = (state,{userProfile} ) => {
 
  return {...state,isNameTrue: true,userFailed: false, userProfile}
}

// Something went wrong somewhere.
export const failure = state => {
 return {...state,isNameTrue: false,userFailed: true,userProfile: null } }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
