import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['userName'],
  userSuccess: ['userProfile'],
  userFailure: null,
  // twitterRequest: ['userName'],
  // twitterSuccess: ['twitterProfile'],
  // twitterFailure: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userProfile: null,
  isNameTrue: false,
  userFailed: true,
  // twitterProfile: null,
  // isTwitterNameTrue: false,
  // twitterFailed: true,

  })

/* ------------- Selectors ------------- */
export const LoginSelectors = {
  getuserProfile: state => state.userProfile,
  // gettwitterProfile: state => state.twitterProfile,
}


/* ------------- Reducers ------------- */

// request the profileInfo from an api
export const request = (state) => {
  return {...state,isNameTrue: false,userFailed: false, userProfile: null}
}
// export const twitterrequest = (state) => {
//   return {...state,isTwitterNameTrue: false,twitterFailed: false, twitterProfile: null}
// }
// successful api lookup
export const success = (state,{userProfile} ) => {
 
  return {...state,isNameTrue: true,userFailed: false, userProfile}
}
// export const twittersuccess= (state,{twitterProfile} ) => {
//   return {...state,isTwitterNameTrue: true,twitterFailed: false, twitterProfile}
// }

// Something went wrong somewhere.
export const failure = state => {
 return {...state,isNameTrue: false,userFailed: true,userProfile: null } }

//  export const twitterfailure = state => {
//   return {...state,isTwitterNameTrue: false,twitterFailed: true,twitterProfile: null } }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  // [Types.USER_TWITTERREQUEST]: twitterrequest,
  // [Types.USER_TWITTERSUCCESS]: twittersuccess,
  // [Types.USER_TWITTERFAILURE]: twitterfailure
})
