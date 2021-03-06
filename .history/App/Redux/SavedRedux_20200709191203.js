import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  twitterRequest: ['screen_name'],
  twitterSuccess: ['twitterProfile'],
  twitterFailure: null,
})

export const TwitterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  twitterProfile: null,
  })

/* ------------- Selectors ------------- */
export const LoginSelectors = {
  getTwitterProfile: state => state.twitterProfile
}


/* ------------- Reducers ------------- */

// request the profileInfo from an api
export const request = (state) => {
  return {...state,twitterProfile: null}
}
// successful api lookup
export const success = (state,{twitterProfile} ) => {
 
  return {...state,twitterProfile}
}

// Something went wrong somewhere.
export const failure = state => {
 return {...state,twitterProfile: null } }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TWITTER_REQUEST]: request,
  [Types.TWITTER_SUCCESS]: success,
  [Types.TWITTER_FAILURE]: failure
})
