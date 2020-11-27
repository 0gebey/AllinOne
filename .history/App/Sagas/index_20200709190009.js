import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import API1 from '../Services/Api1'
import FixtureAPI from '../Services/FixtureAPI'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { userRequest } from './UserSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(UserTypes.USER_REQUEST, userRequest, api)
    
  ])
}
